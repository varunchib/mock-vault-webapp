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

async function getJson<T>(path: string): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token exists
  const session = localStorage.getItem("pyqvault.google.session");
  if (session) {
    try {
      const parsed = JSON.parse(session);
      if (parsed.token && parsed.expiresAt > Date.now()) {
        headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      // Ignore parsing errors
    }
  }

  const response = await fetch(path, { headers });
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

export function fetchExamCatalog(): Promise<Exam[]> {
  return getJson<Exam[]>("/api/exams");
}

export function fetchExamBySlug(slug: string): Promise<Exam> {
  return getJson<Exam>(`/api/exams/${encodeURIComponent(slug)}`);
}

export function fetchExamPapers(slug: string): Promise<Paper[]> {
  return getJson<Paper[]>(`/api/exams/${encodeURIComponent(slug)}/papers`);
}

export function fetchExamQuestions(slug: string): Promise<Question[]> {
  return getJson<Question[]>(
    `/api/exams/${encodeURIComponent(slug)}/questions`,
  );
}

export function fetchPaperBySlug(slug: string): Promise<Paper> {
  return getJson<Paper>(`/api/papers/${encodeURIComponent(slug)}`);
}

export function fetchQuestionBySlug(slug: string): Promise<Question> {
  return getJson<Question>(`/api/questions/${encodeURIComponent(slug)}`);
}

export function fetchMockCatalog(): Promise<MockItem[]> {
  return getJson<MockItem[]>("/api/mocks");
}

export async function authenticateWithGoogle(
  credential: string,
): Promise<{ user: any; token: string }> {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Authentication failed" }));
    throw new Error(error.message || "Authentication failed");
  }

  return response.json();
}
