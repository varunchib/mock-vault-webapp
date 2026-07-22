export type Exam = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  icon: string;
  totalQuestions: number;
  papers: number;
  mocks: number;
  description: string;
  popularYears: string[];
  subjects: string[];
  /** Parent board ("jkssb" for "jkssb-patwari"); absent for a top-level exam.
   *  Backed by vaultcore.exams.board_slug — see lib/examTree.ts. */
  boardSlug?: string;
};

export type QuestionOption = {
  key: string;
  text: string;
};

export type QuestionTranslation = {
  passage?: string;
  question: string;
  options: string[];
};

export type Question = {
  slug: string;
  examSlug: string;
  paperSlug?: string;
  examName: string;
  year: string;
  paper: string;
  subject: string;
  questionNo: string;
  question: string;
  options: QuestionOption[];
  answerKey: string;
  answer: string;
  explanation: string;
  tags: string[];
  images?: string[];
  translations?: Partial<Record<"en" | "hi", QuestionTranslation>>;
};

export type Paper = {
  slug: string;
  examSlug: string;
  examName: string;
  title: string;
  year: string;
  shift: string;
  description: string;
  questions: number;
  subjects: string[];
  negativeMarking: number;
  sourceUrl: string;
  durationMinutes: number;
  maxMarks: number;
  heldOn?: string;
};

export type MockItem = {
  slug: string;
  examSlug: string;
  examName: string;
  title: string;
  description: string;
  questions: number;
  durationMinutes: number;
  difficulty: "Beginner" | "Moderate" | "Advanced";
  isFree: boolean;
  subjects: string[];
  negativeMarking: number;
};

export type CutoffCategory = {
  category: string;
  marks: number;
  source: string;
};

export type ExamCutoffSet = {
  stage: string;
  year: string;
  totalMarks: number;
  avgScore: number;
  stdDev: number;
  cutoffs: CutoffCategory[];
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "user" | "admin";
};

export type RecentAttempt = {
  type: "paper" | "mock";
  slug: string;
  examSlug: string;
  examName: string;
  title: string;
  questions: number;
  attemptedAt: string;
};

export type DashboardBootstrap = {
  user: AuthUser;
  exams: Exam[];
  mocks: MockItem[];
  enrolledExams: Exam[];
  recentAttempts: RecentAttempt[];
  /** Papers added after the user enrolled, keyed by exam slug ("N new" badges). */
  newPapersByExam?: Record<string, number>;
};

export type AdminSummary = {
  exams: Exam[];
  paperCount: number;
  mockCount: number;
  questionCount: number;
  userCount: number;
};

export type AdminMockQuestionPayload = {
  question: string;
  options: QuestionOption[];
  answerKey: string;
  explanation: string;
  subject: string;
};

export type AdminMockPayload = {
  slug: string;
  examSlug: string;
  title: string;
  description: string;
  durationMinutes: number;
  negativeMarking: number;
  difficulty: "Beginner" | "Moderate" | "Advanced";
  isFree: boolean;
  subjects: string[];
  questions: AdminMockQuestionPayload[];
};

type AuthPayload = {
  user: AuthUser;
};

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function normalizeBaseUrl() {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
  if (!baseUrl) return "";

  let normalized = baseUrl.replace(/\/+$/, "");
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const isProductionHost = hostname === "ministryofpapers.com" || hostname === "www.ministryofpapers.com";
  if (isProductionHost) {
    normalized = "https://api.ministryofpapers.com";
  }

  if (normalized.endsWith("/api/v1")) {
    normalized = normalized.slice(0, -7);
  } else if (normalized.endsWith("/api")) {
    normalized = normalized.slice(0, -4);
  }

  return normalized;
}

function buildUrl(path: string) {
  return `${normalizeBaseUrl()}${path}`;
}

function rawFetch(path: string, init?: RequestInit): Promise<Response> {
  const method = (init?.method ?? "GET").toUpperCase()
  const needsContentType = method !== "GET" && method !== "HEAD"
  return fetch(buildUrl(path), {
    credentials: "include",
    headers: {
      ...(needsContentType ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });
}

// The access token cookie lives ~15 min; the refresh token ~30 days. Without
// this, any request made after the access token expired (e.g. an admin who
// prepared a JSON upload for a few minutes, then clicked Push) failed with a
// 401 and no recovery. Now a single 401 transparently refreshes the session
// once and retries the original request, so the whole app self-heals instead
// of scattering copy-pasted retry logic onto individual calls.
const AUTH_ENDPOINT = /\/api\/v1\/auth\/(refresh|me|google|logout)\b/
let refreshInFlight: Promise<boolean> | null = null

function refreshOnce(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = rawFetch("/api/v1/auth/refresh", { method: "POST" })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => { refreshInFlight = null })
  }
  return refreshInFlight
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response = await rawFetch(path, init)

  // Access token expired mid-session → refresh once (deduped across concurrent
  // calls) and retry. Skip for the auth endpoints themselves to avoid a loop.
  if (response.status === 401 && !AUTH_ENDPOINT.test(path)) {
    if (await refreshOnce()) {
      response = await rawFetch(path, init)
    }
  }

  if (!response.ok) {
    const errorPayload = await response
      .json()
      .catch(() => ({ message: `Request failed with status ${response.status}` }));
    throw new APIError(
      errorPayload.message ?? `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function fetchExamCatalog(): Promise<Exam[]> {
  return requestJson<Exam[]>("/api/v1/exams");
}

export function fetchExamBySlug(slug: string): Promise<Exam> {
  return requestJson<Exam>(`/api/v1/exams/${encodeURIComponent(slug)}`);
}

export function fetchExamPapers(slug: string): Promise<Paper[]> {
  return requestJson<Paper[]>(`/api/v1/exams/${encodeURIComponent(slug)}/papers`);
}


export function fetchExamQuestions(slug: string): Promise<Question[]> {
  return requestJson<Question[]>(`/api/v1/exams/${encodeURIComponent(slug)}/questions`);
}


export function fetchPaperCatalog(): Promise<Paper[]> {
  return requestJson<Paper[]>("/api/v1/papers");
}

export function fetchPaperBySlug(slug: string): Promise<Paper> {
  return requestJson<Paper>(`/api/v1/papers/${encodeURIComponent(slug)}`);
}

export async function fetchPaperQuestions(slug: string): Promise<Question[]> {
  // The API returns JSON `null` (not []) for a paper with no rows — e.g. an
  // announced-but-not-yet-conducted paper like JKPSI 2026. Coalesce so callers
  // always get an array; a null here crashes the render (questions.some/.length).
  const data = await requestJson<Question[] | null>(`/api/v1/papers/${encodeURIComponent(slug)}/questions`);
  return data ?? [];
}

export function fetchQuestionBySlug(slug: string): Promise<Question> {
  return requestJson<Question>(`/api/v1/questions/${encodeURIComponent(slug)}`);
}

export function fetchMockCatalog(): Promise<MockItem[]> {
  return requestJson<MockItem[]>("/api/v1/mocks");
}

export function fetchMockBySlug(slug: string): Promise<MockItem> {
  return requestJson<MockItem>(`/api/v1/mocks/${encodeURIComponent(slug)}`);
}

export function fetchMockQuestions(slug: string): Promise<Question[]> {
  return requestJson<Question[]>(`/api/v1/mocks/${encodeURIComponent(slug)}/questions`);
}

export function fetchDashboardBootstrap(): Promise<DashboardBootstrap> {
  return requestJson<DashboardBootstrap>("/api/v1/dashboard");
}

export function fetchAdminSummary(): Promise<AdminSummary> {
  return requestJson<AdminSummary>("/api/v1/admin/summary");
}

export function saveAdminMock(payload: AdminMockPayload): Promise<{ message: string; slug: string }> {
  return requestJson<{ message: string; slug: string }>("/api/v1/admin/mocks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteAdminMock(slug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/api/v1/admin/mocks/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export function deleteAdminQuestion(slug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/api/v1/admin/questions/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export type AdminExamPayload = {
  slug: string
  name: string
  shortName: string
  category: string
  icon: string
  description: string
  subjects: string[]
}

export function saveAdminExam(payload: AdminExamPayload): Promise<{ message: string; slug: string }> {
  return requestJson<{ message: string; slug: string }>('/api/v1/admin/exams', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteAdminExam(slug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/api/v1/admin/exams/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  })
}

export function recordEnrollment(examSlug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/activity/enroll", {
    method: "POST",
    body: JSON.stringify({ examSlug }),
  });
}

export function recordUnenrollment(examSlug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/activity/enroll", {
    method: "DELETE",
    body: JSON.stringify({ examSlug }),
  });
}

export function fetchEnrolledSlugs(): Promise<{ slugs: string[] }> {
  return requestJson<{ slugs: string[] }>("/api/v1/user/enrolled-slugs");
}


export function recordAttempt(params: { examSlug: string; mockSlug?: string; paperSlug?: string }): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/activity/attempt", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// ── Live attempt (Redis-backed) ───────────────────────────────────────────────

export type LiveAttemptState = {
  attemptId: string;
  paperSlug: string;
  examSlug: string;
  paperTitle: string;
  examName: string;
  totalQuestions: number;
  answers: Record<string, string>;
  marked: Record<string, boolean>;
  currentIndex: number;
  remainingSeconds: number;
  startedAt: string;
  resumed: boolean;
};

export type ActiveAttempt = {
  paperSlug: string;
  examSlug: string;
  paperTitle: string;
  examName: string;
  totalQuestions: number;
  answeredCount: number;
  currentIndex: number;
  remainingSeconds: number;
  startedAt: string;
};

export function startLiveAttempt(params: {
  paperSlug: string;
  examSlug: string;
  paperTitle: string;
  examName: string;
  totalQuestions: number;
  durationSeconds: number;
}): Promise<LiveAttemptState> {
  return requestJson<LiveAttemptState>("/api/v1/activity/attempt/start", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function syncLiveAttempt(params: {
  paperSlug: string;
  answers: Record<string, string>;
  marked: Record<string, boolean>;
  currentIndex: number;
  remainingSeconds: number;
}): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>("/api/v1/activity/attempt/sync", {
    method: "PUT",
    body: JSON.stringify(params),
  });
}

export function fetchActiveLiveAttempts(): Promise<ActiveAttempt[]> {
  return requestJson<ActiveAttempt[]>("/api/v1/activity/attempt/active");
}

export function submitLiveAttempt(params: {
  attemptId: string;
  paperSlug: string;
  correct: number;
  wrong: number;
  skipped: number;
  timeTakenSeconds: number;
  answers: Record<string, string>;
}): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>("/api/v1/activity/attempt/submit", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function fetchCurrentUser(): Promise<AuthPayload> {
  return requestJson<AuthPayload>("/api/v1/auth/me");
}

export function refreshAuthSession(): Promise<AuthPayload> {
  return requestJson<AuthPayload>("/api/v1/auth/refresh", {
    method: "POST",
  });
}

export function logoutAuthSession(): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/auth/logout", {
    method: "POST",
  });
}

export function authenticateWithGoogle(credential: string): Promise<AuthPayload> {
  return requestJson<AuthPayload>("/api/v1/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
}

export type AdminPaperQuestionPayload = {
  questionNo: string;
  question: string;
  options: QuestionOption[];
  answerKey: string;
  explanation: string;
  subject: string;
  tags: string[];
};

export type AdminPaperPayload = {
  slug: string;
  examSlug: string;
  title: string;
  year: string;
  shift: string;
  description: string;
  subjects: string[];
  questions: AdminPaperQuestionPayload[];
};

export function saveAdminPaper(payload: AdminPaperPayload): Promise<{ message: string; slug: string }> {
  return requestJson<{ message: string; slug: string }>("/api/v1/admin/papers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteAdminPaper(slug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>(`/api/v1/admin/papers/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export function flushAdminCache(): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/admin/cache-flush", {
    method: "POST",
  });
}

export type AdminUpdateQuestionPayload = {
  question: string
  options: QuestionOption[]
  answerKey: string
  explanation: string
  subject: string
  tags: string[]
}

export function updateAdminQuestion(slug: string, payload: AdminUpdateQuestionPayload): Promise<{ message: string; slug: string }> {
  return requestJson<{ message: string; slug: string }>(`/api/v1/admin/questions/${encodeURIComponent(slug)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// ── Reports ──────────────────────────────────────────────────────────────────

export type QuestionReport = {
  questionSlug: string
  questionNo: string
  paperSlug: string
  reportType: string
  details: string
  userId: string
  userEmail: string
  timestamp: string
}

export function submitReport(payload: {
  questionSlug: string
  questionNo: string
  paperSlug: string
  reportType: string
  details: string
}): Promise<{ message: string }> {
  return requestJson<{ message: string }>('/api/v1/reports', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchAdminReports(): Promise<{ reports: QuestionReport[]; count: number }> {
  return requestJson<{ reports: QuestionReport[]; count: number }>('/api/v1/admin/reports')
}

export function clearAdminReports(): Promise<{ message: string }> {
  return requestJson<{ message: string }>('/api/v1/admin/reports', { method: 'DELETE' })
}

export function fetchExamCutoffs(examSlug: string): Promise<ExamCutoffSet[]> {
  return requestJson<ExamCutoffSet[]>(`/api/v1/exams/${examSlug}/cutoffs`)
}

export type LeaderboardEntry = {
  rank: number
  userId: string
  name: string
  scorePct: number
  isMe: boolean
}

export type ScoreDistribution = {
  totalUsers: number;
  buckets: number[];
  systemCutoffPct: number;
};

export type RecentVisit = {
  type: "paper" | "mock";
  slug: string;
  title: string;
  examName: string;
  at: string;
};

export type TopVisited = {
  type: "paper" | "mock";
  slug: string;
  title: string;
  examName: string;
  visits: number;
};

/** Fire-and-forget: records a paper/mock view for recent-visits + the top chart. */
export function recordContentVisit(type: "paper" | "mock", slug: string): Promise<{ message: string }> {
  return requestJson<{ message: string }>("/api/v1/activity/visit", {
    method: "POST",
    body: JSON.stringify({ type, slug }),
  });
}

export function fetchRecentVisits(): Promise<{ visits: RecentVisit[] }> {
  return requestJson("/api/v1/activity/recent-visits");
}

export function fetchAdminTopVisited(): Promise<{ month: string; top: TopVisited[] }> {
  return requestJson("/api/v1/admin/top-visited");
}

export function fetchScoreDistribution(examSlug: string): Promise<ScoreDistribution> {
  return requestJson(`/api/v1/analytics/score-distribution?examSlug=${encodeURIComponent(examSlug)}`);
}

export function fetchLeaderboard(examSlug: string, asUser?: string): Promise<{ top10: LeaderboardEntry[]; userRank: number }> {
  const qs = new URLSearchParams({ examSlug })
  if (asUser) qs.set('asUser', asUser)
  return requestJson(`/api/v1/analytics/leaderboard?${qs.toString()}`)
}

export type AdminUser = {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  createdAt: string
  lastLogin: string
  city?: string
}

export function fetchAdminActiveCount(): Promise<{ count: number; onlineIds?: string[] }> {
  return requestJson('/api/v1/admin/active-count')
}

export type AuditEntry = {
  id: number
  actorId: string
  actorEmail: string
  action: string
  target: string
  details: Record<string, unknown>
  ipAddress: string
  createdAt: string
}

export function fetchAdminAudit(limit = 100): Promise<{ entries: AuditEntry[]; count: number }> {
  return requestJson(`/api/v1/admin/audit?limit=${limit}`)
}

export function fetchAdminUsers(params: { limit?: number; offset?: number; q?: string } = {}): Promise<{ users: AdminUser[]; total: number; limit: number; offset: number }> {
  const qs = new URLSearchParams()
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.offset) qs.set('offset', String(params.offset))
  if (params.q) qs.set('q', params.q)
  return requestJson(`/api/v1/admin/users?${qs.toString()}`)
}

export type AdminUserAttempt = {
  type: 'paper' | 'mock'
  slug: string
  examSlug: string
  examName: string
  title: string
  correct: number
  total: number
  scorePct: number
  timeTakenSeconds: number
  completedAt: string
}

export type AdminUserExamRank = {
  examSlug: string
  examName: string
  scorePct: number
  rank: number
  totalRanked: number
}

export type AdminRecentVisit = {
  type: 'paper' | 'mock'
  slug: string
  title: string
  examName: string
  at: string
}

export type AdminUserDetail = {
  user: AdminUser
  attempts: AdminUserAttempt[]
  examRanks: AdminUserExamRank[]
  recentVisits: AdminRecentVisit[]
}

export type AdminActiveUser = {
  id: string
  name: string
  email: string
  city?: string
  lastSeen: string
  secondsAgo: number
  recentVisits: AdminRecentVisit[]
}

// Live users behind the green presence dot — most recently seen first, max 20.
export function fetchAdminActiveUsers(): Promise<{ users: AdminActiveUser[]; count: number }> {
  return requestJson('/api/v1/admin/active-users')
}

export function fetchAdminUserDetail(id: string): Promise<AdminUserDetail> {
  return requestJson(`/api/v1/admin/users/${encodeURIComponent(id)}/detail`)
}

export type AdminAnalyticsSubject = {
  subject: string
  total: number
  correct: number
  wrong: number
  skipped: number
}

export type AdminAnalyticsResult = {
  type: 'mock' | 'paper'
  slug: string
  examSlug: string
  examName: string
  title: string
  totalQuestions: number
  attemptedAt: string
  answered: number
  correct: number
  wrong: number
  skipped: number
  maxMarks?: number
  negativeMarking?: number
  timeTakenSeconds: number
  subjects: AdminAnalyticsSubject[]
}

export type AdminUserAnalytics = {
  user: AdminUser
  results: AdminAnalyticsResult[]
}

export function fetchAdminUserAnalytics(id: string): Promise<AdminUserAnalytics> {
  return requestJson(`/api/v1/admin/users/${encodeURIComponent(id)}/analytics`)
}

export function updateAdminUserStatus(id: string, isActive: boolean): Promise<{ message: string }> {
  return requestJson(`/api/v1/admin/users/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  })
}

export function adminUpsertCutoff(payload: {
  examSlug: string; stage: string; year: string; category: string;
  marks: number; totalMarks: number; avgScore: number; stdDev: number; source?: string;
}): Promise<{ message: string }> {
  return requestJson<{ message: string }>('/api/v1/admin/cutoffs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// ── Inbox ─────────────────────────────────────────────────────────────────────

export type InboxMessage = {
  id: string
  from: 'user' | 'admin'
  text: string
  createdAt: string
}

export type InboxThread = {
  id: string
  userId: string
  userName: string
  userEmail: string
  examSlug?: string
  examName?: string
  searchTerm?: string
  messages: InboxMessage[]
  createdAt: string
  status: 'open' | 'replied'
}

export function createInboxThread(payload: {
  text: string
  examSlug?: string
  examName?: string
  searchTerm?: string
}): Promise<{ threadId: string }> {
  return requestJson('/api/v1/inbox', { method: 'POST', body: JSON.stringify(payload) })
}

export function fetchMyInboxThreads(): Promise<InboxThread[]> {
  return requestJson('/api/v1/inbox/me')
}

export function sendInboxMessage(threadId: string, text: string): Promise<{ ok: boolean }> {
  return requestJson(`/api/v1/inbox/${encodeURIComponent(threadId)}/message`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}

export function fetchAdminInbox(): Promise<InboxThread[]> {
  return requestJson('/api/v1/admin/inbox')
}

export function adminInboxReply(threadId: string, text: string): Promise<{ ok: boolean }> {
  return requestJson(`/api/v1/admin/inbox/${encodeURIComponent(threadId)}/reply`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}

export function adminInboxDelete(threadId: string): Promise<{ ok: boolean }> {
  return requestJson(`/api/v1/admin/inbox/${encodeURIComponent(threadId)}`, { method: 'DELETE' })
}
