import { CheckCircle2, Lock, Play, Share2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState, Fragment } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { HaloLoader } from "../components/common/HaloLoader";
import { examPreviousPapersPath } from "../lib/routes";
import { fetchQuestionBySlug, type Question } from "../lib/api";
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from "../lib/questionLanguage";
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
  const [language, setLanguage] = useState<QuestionLanguage>("en");

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
    ? `${question.examName} ${question.year} Question ${question.questionNo} | Ministry of Papers`
    : "Solved Exam Question | Ministry of Papers";
  const description = question
    ? `${question.question} Practice this PYQ and continue with related previous year questions.`
    : "Read solved exam questions with answers and explanations on Ministry of Papers.";

  usePageMeta({
    title,
    description,
    canonicalPath: question ? `/question/${question.slug}` : "/question",
    jsonLd: question
      ? {
          "@context": "https://schema.org",
          "@type": "QAPage",
          name: title,
          url: `https://ministryofpapers.com/question/${question.slug}`,
          mainEntity: {
            "@type": "Question",
            name: question.question,
            text: question.question,
            answerCount: 1,
            educationalLevel: "Competitive exam preparation",
            about: { "@type": "Thing", name: question.examName },
            acceptedAnswer: {
              "@type": "Answer",
              text: `The correct answer is explained on Ministry of Papers. Exam: ${question.examName}, Year: ${question.year}.`,
              url: `https://ministryofpapers.com/question/${question.slug}`,
              author: { "@type": "Organization", name: "Ministry of Papers" },
            },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ministryofpapers.com" },
              { "@type": "ListItem", position: 2, name: question.examName, item: `https://ministryofpapers.com/exam/${question.examSlug ?? ""}` },
              { "@type": "ListItem", position: 3, name: `Q${question.questionNo}`, item: `https://ministryofpapers.com/question/${question.slug}` },
            ],
          },
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
          <HaloLoader label="Loading question" />
        </div>
      </section>
    );
  }

  if (error || !question) return <Navigate to="/" replace />;
  const isDeleted = question.answerKey === 'Deleted';
  const homeHref = isAuthenticated ? "/dashboard" : "/";
  const localized = getLocalizedQuestion(question, language);

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
              <h1>
                Q{question.questionNo}.{' '}
                {localized.question.split('\n').map((line, i, arr) => (
                  <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
                ))}
              </h1>
              {hasHindi(question) && (
                <div className="pyq-language-toggle" aria-label="Question language">
                  <button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>English</button>
                  <button type="button" className={language === "hi" ? "active" : ""} onClick={() => setLanguage("hi")}>हिन्दी</button>
                </div>
              )}
            </header>

            {localized.passage && (
              <section className="pyq-reader-card">
                <div className="pyq-passage">
                  <strong>{language === "hi" ? "अनुच्छेद" : "Passage"}</strong>
                  <p>{localized.passage}</p>
                </div>
              </section>
            )}

            {isDeleted ? (
              <section className="pyq-reader-card pyq-reader-deleted">
                <div className="pyq-deleted-badge-lg">Deleted Question</div>
                <p className="pyq-deleted-reason">{question.explanation}</p>
                <div className="q-actions">
                  <button className="qa-btn ghost" type="button" onClick={() => void navigator.clipboard?.writeText(window.location.href)}>
                    <Share2 size={16} /> Copy Link
                  </button>
                </div>
              </section>
            ) : (
              <>
                <section className="pyq-reader-card">
                  <h2>Choose your answer</h2>
                  <div className="pyq-option-list">
                    {localized.options.map((option) => {
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
              </>
            )}
          </main>

          <aside className="pyq-reader-side">
            <div className="pyq-action-card">
              <h2>{isAuthenticated ? 'More from this exam' : 'Sign in free'}</h2>
              <p>{isAuthenticated
                ? 'Submit answers, save your progress, and track your performance across all exams.'
                : 'Login is required to submit answers, save scores, and download PDFs. It\'s free.'
              }</p>
              {!isAuthenticated && (
                <>
                  <button className="primary" type="button" onClick={gateAction}>
                    <Play size={16} /> Sign in with Google
                  </button>
                  <div className="pyq-login-note">
                    <Lock size={14} /> Free to sign in — no credit card needed.
                  </div>
                </>
              )}
              {isAuthenticated && question.paperSlug && (
                <Link
                  className="primary"
                  to={`/pyq/${question.paperSlug}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
                >
                  <Play size={16} /> View full paper
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
