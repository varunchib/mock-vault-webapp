import { BookOpen, Download, Filter, FileText, Lock, Play, Search } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { examSlugFromPreviousPapersPath } from "../lib/routes";
import {
  fetchExamBySlug,
  fetchExamPapers,
  type Exam,
  type Paper,
} from "../lib/api";
import { useAuth } from "../context/useAuth";
import { usePageMeta } from "../lib/usePageMeta";

export function PreviousYearPapersPage() {
  const { examPath } = useParams();
  const examSlug = examSlugFromPreviousPapersPath(examPath);
  const [exam, setExam] = useState<Exam | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeYear, setActiveYear] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!examSlug) return;
    queueMicrotask(() => {
      setLoading(true);
      setError(false);
    });

    Promise.all([fetchExamBySlug(examSlug), fetchExamPapers(examSlug)])
      .then(([examData, paperData]) => {
        setExam(examData);
        setPapers(paperData);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [examSlug]);

  const title = exam
    ? `${exam.shortName} Previous Year Question Papers with Solutions | PYQVault`
    : "Previous Year Question Papers | PYQVault";
  const description = exam
    ? `Download and attempt ${exam.shortName} previous year question papers with solutions, explanations, and year-wise papers.`
    : "Browse previous year question papers with solutions and explanations.";

  usePageMeta({
    title,
    description,
    canonicalPath: exam
      ? `/${exam.slug}-exam/previous-year-papers`
      : "/previous-year-papers",
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

  const years = useMemo(
    () => ["All", ...Array.from(new Set(papers.map((paper) => paper.year)))],
    [papers],
  );

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesYear = activeYear === "All" || paper.year === activeYear;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.shift.toLowerCase().includes(q) ||
        paper.subjects.join(" ").toLowerCase().includes(q);
      return matchesYear && matchesQuery;
    });
  }, [papers, activeYear, query]);

  if (!examSlug) return <Navigate to="/exam" replace />;

  if (loading) {
    return (
      <section className="pyp-sober-page">
        <div className="pyp-sober-shell">
          <p>Loading papers...</p>
        </div>
      </section>
    );
  }

  if (error || !exam) return <Navigate to="/exam" replace />;

  const gatedAction = () => {
    if (isAuthenticated) {
      window.alert("This will open attempt/download after backend integration.");
      return;
    }
    setLoginOpen(true);
  };

  return (
    <section className="pyp-sober-page">
      <div className="pyp-sober-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/exam/${exam.slug}`}>{exam.shortName}</Link>
          <span>/</span>
          <span>Previous Year Papers</span>
        </nav>

        <header className="pyp-sober-hero">
          <div>
            <span>{exam.category} Exam</span>
            <h1>{exam.shortName} Previous Year Papers</h1>
            <p>Open solved paper pages, read answers freely, or attempt the same paper as a mock after login.</p>
          </div>
          <aside>
            <BookOpen size={18} />
            <strong>{exam.papers} papers available</strong>
            <small>{exam.totalQuestions} solved questions</small>
          </aside>
        </header>

        <div className="pyp-sober-layout">
          <main className="pyp-sober-main">
            <section className="pyp-sober-toolbar">
              <label>
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${exam.shortName} papers...`}
                />
              </label>
              <button type="button"><Filter size={15} /> Filter</button>
            </section>

            <section className="pyp-sober-years">
              {years.map((year) => (
                <button
                  className={year === activeYear ? "active" : ""}
                  type="button"
                  key={year}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </button>
              ))}
            </section>

            <section className="pyp-sober-card-grid">
              {filteredPapers.map((paper) => (
                <article className="pyp-sober-card" key={paper.slug}>
                  <div className="pyp-sober-card-top">
                    <span><FileText size={15} /> {paper.year}</span>
                    <small>{paper.questions} Questions</small>
                  </div>
                  <Link to={`/pyq/${paper.slug}`}>{paper.title}</Link>
                  <p>{paper.shift}</p>
                  <div className="pyp-sober-tags">
                    {paper.subjects.slice(0, 4).map((subject) => (
                      <span key={subject}>{subject}</span>
                    ))}
                  </div>
                  <div className="pyp-sober-actions">
                    <Link to={`/pyq/${paper.slug}`}>View solutions</Link>
                    <button type="button" onClick={gatedAction}><Play size={15} /> Attempt</button>
                    <button type="button" onClick={gatedAction}><Download size={15} /> PDF</button>
                  </div>
                </article>
              ))}
            </section>
          </main>

          <aside className="pyp-sober-side">
            <div className="pyp-sober-side-card highlight">
              <Lock size={17} />
              <h3>Attempt papers as mock tests</h3>
              <p>Login to save score, resume later, and access PDF downloads.</p>
              <button type="button" onClick={gatedAction}>Login to continue</button>
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
