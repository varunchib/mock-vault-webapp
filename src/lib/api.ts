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

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase()
  const needsContentType = method !== "GET" && method !== "HEAD"
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    headers: {
      ...(needsContentType ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });

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

export function fetchPaperQuestions(slug: string): Promise<Question[]> {
  return requestJson<Question[]>(`/api/v1/papers/${encodeURIComponent(slug)}/questions`);
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

export function fetchLeaderboard(examSlug: string): Promise<{ top10: LeaderboardEntry[]; userRank: number }> {
  return requestJson(`/api/v1/analytics/leaderboard?examSlug=${encodeURIComponent(examSlug)}`)
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
