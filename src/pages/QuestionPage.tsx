import { CheckCircle2, Download, Lock, Play, Share2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    queueMicrotask(() => {
      setLoading(true);
      setError(false);
    });
    fetchQuestionBySlug(slug)
      .then(setQuestion)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = question
    ? `${question.examName} ${question.year} Question ${question.questionNo} with Answer | PYQVault`
    : "Solved Exam Question with Explanation | PYQVault";
  const description = question
    ? `${question.question} Answer: ${question.answer}. Read the explanation and practice related PYQs.`
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
          acceptedAnswer: {
            "@type": "Answer",
            text: question.explanation,
          },
          about: question.examName,
          educationalLevel: "Competitive exam preparation",
        }
      : undefined,
  });

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

  const gateAction = () => {
    if (isAuthenticated) {
      window.alert("Opening logged-in feature...");
      return;
    }
    setLoginOpen(true);
  };

  return (
    <section className="pyq-reader-page">
      <div className="pyq-reader-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
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
                  const isCorrect = option.key === question.answerKey;
                  const isSelected = selected === option.key;
                  const stateClass = isSelected
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : "";

                  return (
                    <button
                      className={stateClass}
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
            </section>

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
          </main>

          <aside className="pyq-reader-side">
            <div className="pyq-action-card">
              <h2>Attempt this topic as mock</h2>
              <p>Login to save scores, track attempts, and download the full paper PDF.</p>
              <button className="primary" type="button" onClick={gateAction}>
                <Play size={16} /> Attempt Mock
              </button>
              <button type="button" onClick={gateAction}>
                <Download size={16} /> Download PDF
              </button>
              <button type="button" onClick={() => void navigator.clipboard?.writeText(window.location.href)}>
                <Share2 size={16} /> Copy Link
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
