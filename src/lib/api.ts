export type Exam = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  icon: string;
  totalQuestions: string;
  papers: string;
  mocks: string;
  description: string;
  popularYears: string[];
  subjects: string[];
};

export type QuestionOption = {
  key: string;
  text: string;
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
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "user" | "admin";
};

export type DashboardBootstrap = {
  user: AuthUser;
  exams: Exam[];
  mocks: MockItem[];
  recentQuestions: Question[];
};

export type AdminSummary = {
  exams: Exam[];
  paperCount: number;
  mockCount: number;
  questionCount: number;
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
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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

export function fetchDashboardBootstrap(): Promise<DashboardBootstrap> {
  return requestJson<DashboardBootstrap>("/api/v1/dashboard");
}

export function fetchAdminSummary(): Promise<AdminSummary> {
  return requestJson<AdminSummary>("/api/v1/admin/summary");
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
