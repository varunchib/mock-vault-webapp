import {
  ArrowRight,
  BookOpen,
  FileText,
  Lock,
  Play,
  Search,
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { HaloLoader } from "../components/common/HaloLoader";
import { examPreviousPapersPath } from "../lib/routes";
import {
  fetchExamCatalog,
  fetchExamBySlug,
  fetchExamPapers,
  fetchExamQuestions,
  type Exam,
  type Paper,
  type Question,
} from "../lib/api";
import { useAuth } from "../context/useAuth";
import { usePageMeta } from "../lib/usePageMeta";

export function ExamPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [exam, setExam] = useState<Exam | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    queueMicrotask(() => {
      setLoading(true);
      setError(false);
    });

    Promise.all([
      fetchExamBySlug(slug),
      fetchExamPapers(slug),
      fetchExamQuestions(slug),
    ])
      .then(([examData, paperData, questionData]) => {
        setExam(examData);
        setPapers(paperData);
        setQuestions(questionData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const title = exam
    ? `${exam.shortName} Previous Year Question Papers with Solutions | PYQVault`
    : "Exam PYQs and Mock Tests | PYQVault";
  const description =
    exam?.description ??
    "Browse solved previous year questions, mock tests, answer keys, and explanations on PYQVault.";

  usePageMeta({
    title,
    description,
    canonicalPath: exam ? `/exam/${exam.slug}` : "/exam",
    jsonLd: exam
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          about: exam.name,
        }
      : undefined,
  });

  if (!slug) return <Navigate to="/" replace />;

  if (loading) {
    return (
      <section className="public-page exam-public-page">
        <div className="public-shell">
          <HaloLoader label="Loading exam" />
        </div>
      </section>
    );
  }
  if (error || !exam) return <Navigate to="/" replace />;

  const recentQuestions = questions.slice(0, 3);
  const latestPaper = papers[0];
  const homeHref = isAuthenticated ? "/dashboard" : "/";

  const continueAttempt = () => {
    if (latestPaper) {
      navigate(`/pyq/${latestPaper.slug}`);
      return;
    }
    if (!isAuthenticated) {
      setLoginOpen(true);
    }
  };

  return (
    <section className="public-page exam-public-page">
      <div className="public-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <span>{exam.shortName}</span>
        </nav>

        <header className="public-hero compact sober-hero">
          <div>
            <span className="public-kicker">
              {exam.icon} {exam.category} Exam
            </span>
            <h1>{exam.name} previous year question papers</h1>
            <p>{exam.description}</p>
            <div className="public-actions">
              <Link
                className="dash-primary link-button"
                to={examPreviousPapersPath(exam.slug)}
              >
                <FileText size={17} /> View all papers
              </Link>
              <button
                className="dash-secondary"
                type="button"
                onClick={continueAttempt}
              >
                <Play size={17} /> Attempt latest
              </button>
            </div>
          </div>
          <div className="exam-score-card">
            <div>
              <strong>{exam.totalQuestions}</strong>
              <span>Solved questions</span>
            </div>
            <div>
              <strong>{exam.papers}</strong>
              <span>PYQ papers</span>
            </div>
            <div>
              <strong>{exam.mocks}</strong>
              <span>Mock tests</span>
            </div>
          </div>
        </header>

        <section className="public-grid two-col">
          <div className="public-card">
            <div className="public-card-head">
              <h2>Solved question papers</h2>
              <Search size={18} />
            </div>
            <div className="link-list">
              {papers.map((paper) => (
                <Link to={`/pyq/${paper.slug}`} key={paper.slug}>
                  <span>
                    <FileText size={16} /> {paper.title}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}
              {papers.length === 0 ? (
                <p className="muted-copy">
                  Solved paper pages for this exam are being added.
                </p>
              ) : null}
            </div>
          </div>

          <div className="public-card">
            <div className="public-card-head">
              <h2>Browse by subject</h2>
              <BookOpen size={18} />
            </div>
            <div className="subject-cloud">
              {exam.subjects.map((subject) => (
                <span key={subject}>{subject}</span>
              ))}
            </div>
            <div className="year-row">
              {exam.popularYears.map((year) => (
                <button type="button" key={year}>
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="public-card seo-copy-card">
          <h2>Public paper pages. Login only when you submit.</h2>
          <p>
            Students can open papers and read the question flow without an account.
            Login is required when they submit answers, save progress, download PDFs,
            or want analytics.
          </p>
          <div className="locked-row">
            <Lock size={16} /> Submitting answers, saved history, PDFs, and analytics require login.
          </div>
        </section>

        {recentQuestions.length ? (
          <section className="public-card seo-copy-card">
            <h2>Recently solved questions</h2>
            <div className="link-list">
              {recentQuestions.map((question) => (
                <Link to={`/question/${question.slug}`} key={question.slug}>
                  <span>
                    Q{question.questionNo}. {question.subject} - {question.year}
                  </span>
                  <span>Open</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}

export function AllExamsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const query = searchParams.get("q") ?? "";

  usePageMeta({
    title: "All Competitive Exam PYQs and Mock Tests | PYQVault",
    description:
      "Browse UPSC, SSC, JKSSB, NEET, banking, railway, state PSC and other exam PYQs with solved answers and explanations.",
    canonicalPath: "/exam",
  });

  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true);
      setError(false);
    });
    fetchExamCatalog()
      .then(setExams)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredExams = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return exams;

    return exams.filter((examItem) =>
      [
        examItem.name,
        examItem.shortName,
        examItem.category,
        examItem.description,
        ...examItem.subjects,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [exams, query]);

  return (
    <section className="public-page">
      <div className="public-shell">
        <header className="utility-page-hero">
          <div>
            <small>Browse Exams</small>
            <h1>Exam library</h1>
            <p>
              Browse exams, open paper pages, and move straight to the questions you want.
            </p>
          </div>
        </header>

        <section className="pyp-sober-toolbar" style={{ marginBottom: "1.5rem" }}>
          <label>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => {
                const next = event.target.value;
                if (next.trim()) setSearchParams({ q: next });
                else setSearchParams({});
              }}
              placeholder="Search your exam, subject, category..."
            />
          </label>
        </section>

        <div className="catalog-grid">
          {loading ? (
            <HaloLoader label="Loading exams" fullHeight={false} />
          ) : error ? (
            <p>Unable to load exams. Please try again later.</p>
          ) : filteredExams.length === 0 ? (
            <p>No exams matched your search.</p>
          ) : (
            filteredExams.map((examItem) => (
              <Link
                className="catalog-card"
                to={examPreviousPapersPath(examItem.slug)}
                key={examItem.slug}
              >
                <span>{examItem.icon}</span>
                <strong>{examItem.shortName}</strong>
                <small>{examItem.papers} papers</small>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
