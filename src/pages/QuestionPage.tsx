import { CheckCircle2, Download, Lock, Play, Share2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { examPreviousPapersPath } from "../lib/routes";
import { fetchQuestionBySlug, type Question } from "../lib/api";
import { useAuth } from "../context/useAuth";
import { usePageMeta } from "../lib/usePageMeta";

export function QuestionPage() {
  const { slug } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    queueMicrotask(() => {
      setLoading(true);
      setError(false);
      setSelected(null);
      setSubmitted(false);
    });

    fetchQuestionBySlug(slug)
      .then(setQuestion)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = question
    ? `${question.examName} ${question.year} Question ${question.questionNo} | PYQVault`
    : "Solved Exam Question | PYQVault";
  const description = question
    ? `${question.question} Practice this PYQ and continue with related previous year questions.`
    : "Read solved exam questions with answers and explanations on PYQVault.";

  usePageMeta({
    title,
    description,
    canonicalPath: question ? `/question/${question.slug}` : "/question",
    jsonLd: question
      ? {
          "@context": "https://schema.org",
          "@type": "Question",
          name: question.question,
          about: question.examName,
          educationalLevel: "Competitive exam preparation",
        }
      : undefined,
  });

  const optionState = useMemo(() => {
    if (!submitted || !question) return new Map<string, string>();

    return new Map(
      question.options.map((option) => {
        if (option.key === question.answerKey) return [option.key, "correct"];
        if (option.key === selected) return [option.key, "incorrect"];
        return [option.key, ""];
      }),
    );
  }, [question, selected, submitted]);

  if (!slug) return <Navigate to="/" replace />;

  if (loading) {
    return (
      <section className="pyq-reader-page">
        <div className="pyq-reader-shell">
          <p>Loading question...</p>
        </div>
      </section>
    );
  }

  if (error || !question) return <Navigate to="/" replace />;
  const homeHref = isAuthenticated ? "/dashboard" : "/";

  const submitAttempt = () => {
    if (!selected) return;
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    setSubmitted(true);
  };

  const gateAction = () => {
    if (isAuthenticated) {
      return;
    }
    setLoginOpen(true);
  };

  return (
    <section className="pyq-reader-page">
      <div className="pyq-reader-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <Link to={examPreviousPapersPath(question.examSlug)}>
            {question.examName} Papers
          </Link>
          <span>/</span>
          <span>Q{question.questionNo}</span>
        </nav>

        <div className="pyq-reader-layout">
          <main className="pyq-reader-main">
            <header className="pyq-reader-header">
              <div className="pyq-reader-meta">
                <span>{question.examName}</span>
                <span>{question.year}</span>
                <span>{question.paper}</span>
                <span>{question.subject}</span>
              </div>
              <h1>Q{question.questionNo}. {question.question}</h1>
            </header>

            <section className="pyq-reader-card">
              <h2>Choose your answer</h2>
              <div className="pyq-option-list">
                {question.options.map((option) => {
                  const isSelected = selected === option.key;
                  const stateClass = optionState.get(option.key) ?? "";

                  return (
                    <button
                      className={`${isSelected ? "selected" : ""} ${stateClass}`.trim()}
                      type="button"
                      key={option.key}
                      onClick={() => setSelected(option.key)}
                    >
                      <span>{option.key}</span>
                      <strong>{option.text}</strong>
                    </button>
                  );
                })}
              </div>
              <div className="q-actions">
                <button className="qa-btn primary" type="button" onClick={submitAttempt} disabled={!selected}>
                  Submit answer
                </button>
                <button className="qa-btn ghost" type="button" onClick={() => void navigator.clipboard?.writeText(window.location.href)}>
                  <Share2 size={16} /> Copy Link
                </button>
              </div>
              {!isAuthenticated ? (
                <div className="pyq-login-note">
                  <Lock size={14} /> You can open and attempt the question freely. Login is required when you submit.
                </div>
              ) : null}
            </section>

            {submitted ? (
              <section className="pyq-reader-card explanation-card">
                <div className="answer-line">
                  <CheckCircle2 size={18} /> Correct answer:
                  <strong>{question.answer}</strong>
                </div>
                <p>{question.explanation}</p>
                <div className="pyq-tag-list">
                  {question.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            ) : null}
          </main>

          <aside className="pyq-reader-side">
            <div className="pyq-action-card">
              <h2>Attempt this topic as mock</h2>
              <p>Public visitors can read the paper. Login is required to submit answers, save scores, and download PDFs.</p>
              <button className="primary" type="button" onClick={gateAction}>
                <Play size={16} /> Continue with account
              </button>
              <button type="button" onClick={gateAction}>
                <Download size={16} /> Download PDF
              </button>
              <div className="pyq-login-note">
                <Lock size={14} /> Login required for saved progress, analytics, and PDFs.
              </div>
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
