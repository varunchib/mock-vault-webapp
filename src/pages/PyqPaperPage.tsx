import { Download, FileText, Lock, Play } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { examPreviousPapersPath } from "../lib/routes";
import {
  fetchPaperBySlug,
  fetchPaperQuestions,
  type Paper,
  type Question,
} from "../lib/api";
import { useAuth } from "../context/useAuth";
import { usePageMeta } from "../lib/usePageMeta";

export function PyqPaperPage() {
  const navigate = useNavigate()
  const { slug } = useParams();
  const [paper, setPaper] = useState<Paper | null>(null);
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

    fetchPaperBySlug(slug)
      .then((paperData) => {
        setPaper(paperData);
        return fetchPaperQuestions(paperData.slug);
      })
      .then(setQuestions)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = paper
    ? `${paper.title} PDF, Questions and Answers | PYQVault`
    : "Solved PYQ Paper | PYQVault";
  const description =
    paper?.description ??
    "Read solved previous year question papers with answers and explanations.";

  usePageMeta({
    title,
    description,
    canonicalPath: paper ? `/pyq/${paper.slug}` : "/pyq",
    jsonLd: paper
      ? {
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: paper.title,
          description: paper.description,
          educationalLevel: "Competitive exam preparation",
          learningResourceType: "Previous year question paper",
        }
      : undefined,
  });

  const relatedQuestions = useMemo(() => questions, [questions]);

  if (!slug) return <Navigate to="/exam" replace />;

  if (loading) {
    return (
      <section className="pyq-paper-page">
        <div className="pyq-paper-shell">
          <p>Loading paper...</p>
        </div>
      </section>
    );
  }

  if (error || !paper) return <Navigate to="/exam" replace />;
  const homeHref = isAuthenticated ? "/dashboard" : "/";

  const gatedAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
      return;
    }
    setLoginOpen(true);
  };

  return (
    <section className="pyq-paper-page">
      <div className="pyq-paper-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <Link to={examPreviousPapersPath(paper.examSlug)}>
            {paper.examName} Papers
          </Link>
          <span>/</span>
          <span>{paper.year}</span>
        </nav>

        <div className="pyq-paper-layout">
          <main className="pyq-paper-main">
            <header className="pyq-paper-header">
              <span>{paper.examName} - {paper.year}</span>
              <h1>{paper.title}</h1>
              <p>{paper.description}</p>
              <div className="pyq-paper-meta">
                <small>{paper.questions} Questions</small>
                <small>{paper.shift}</small>
                <small>{paper.subjects.length} Subjects</small>
              </div>
            </header>

            <section className="pyq-paper-card">
              <div className="pyq-paper-card-head">
                <h2>Question-wise solutions</h2>
                <span>{relatedQuestions.length} solved</span>
              </div>
              <div className="pyq-paper-question-list">
                {relatedQuestions.map((question) => (
                  <Link to={`/question/${question.slug}`} key={question.slug}>
                    <span>Q{question.questionNo}</span>
                    <div>
                      <strong>{question.question}</strong>
                      <small>{question.subject} - Open question</small>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="pyq-paper-side">
            <div className="pyq-paper-action-card">
              <h2>Attempt this paper</h2>
              <p>Paper pages stay public. Login is required when you submit answers, save history, or download PDFs.</p>
              <button className="primary" type="button" onClick={gatedAction}>
                <Play size={16} /> Continue with account
              </button>
              <button type="button" onClick={gatedAction}>
                <Download size={16} /> Download PDF
              </button>
              <div className="pyq-paper-login-note">
                <Lock size={14} /> Login required for saved attempts and PDF access.
              </div>
            </div>

            <div className="pyq-paper-detail-card">
              <h3>Paper details</h3>
              <p><FileText size={14} /> {paper.questions} questions</p>
              <p>{paper.shift}</p>
              <p>{paper.subjects.join(", ")}</p>
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
