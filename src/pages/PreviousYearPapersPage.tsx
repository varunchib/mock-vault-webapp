import { BookOpen, Download, FileText, Lock, Play, Search } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        paper.title.toLowerCase().includes(normalizedQuery) ||
        paper.shift.toLowerCase().includes(normalizedQuery) ||
        paper.subjects.join(" ").toLowerCase().includes(normalizedQuery);

      return matchesYear && matchesQuery;
    });
  }, [papers, activeYear, query]);

  if (!examSlug) return <Navigate to="/exam" replace />;

  if (loading) {
    return (
      <section className="pyp-page">
        <div className="pyp-shell">
          <p>Loading papers...</p>
        </div>
      </section>
    );
  }

  if (error || !exam) return <Navigate to="/exam" replace />;

  const homeHref = isAuthenticated ? "/dashboard" : "/";

  const continueAttempt = (paperSlug: string) => {
    navigate(`/pyq/${paperSlug}`);
  };

  const gatedAction = () => {
    if (isAuthenticated) {
      return;
    }
    setLoginOpen(true);
  };

  return (
    <section className="pyp-page">
      <div className="pyp-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <Link to={`/exam/${exam.slug}`}>{exam.shortName}</Link>
          <span>/</span>
          <span>Previous Year Papers</span>
        </nav>

        <header className="pyp-hero">
          <div>
            <span>{exam.category} Exam</span>
            <h1>{exam.shortName} previous year papers</h1>
            <p>Open papers, read questions, and move through the list quickly. Login is required only for submission, saved progress, and downloads.</p>
            <div className="pyp-hero-stats">
              <strong>{exam.papers}</strong>
              <span>papers</span>
              <strong>{exam.totalQuestions}</strong>
              <span>solved questions</span>
            </div>
          </div>
          <aside>
            <BookOpen size={18} />
            <p>Simple public paper listing for {exam.shortName} with year filters and direct open links.</p>
          </aside>
        </header>

        <div className="pyp-layout">
          <main className="pyp-main">
            <section className="pyp-toolbar">
              <label>
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${exam.shortName} papers...`}
                />
              </label>
            </section>

            <section className="pyp-year-filter">
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

            <section className="pyp-list-card">
              <div className="pyp-list-head">
                <h2>{exam.shortName} paper listing</h2>
                <span>{filteredPapers.length} papers</span>
              </div>

              <div className="pyp-paper-list">
                {filteredPapers.map((paper) => (
                  <article className="pyp-paper-row" key={paper.slug}>
                    <div className="pyp-paper-icon">
                      <FileText size={18} />
                    </div>
                    <div className="pyp-paper-copy">
                      <Link to={`/pyq/${paper.slug}`}>{paper.title}</Link>
                      <p>{paper.year} - {paper.shift} - {paper.questions} questions</p>
                      <div>
                        {paper.subjects.slice(0, 4).map((subject) => (
                          <span key={subject}>{subject}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pyp-paper-actions">
                      <Link to={`/pyq/${paper.slug}`}>Open paper</Link>
                      <button className="primary" type="button" onClick={() => continueAttempt(paper.slug)}>
                        <Play size={15} /> Attempt
                      </button>
                      <button type="button" onClick={gatedAction}>
                        <Download size={15} /> PDF
                      </button>
                    </div>
                  </article>
                ))}

                {filteredPapers.length === 0 ? (
                  <p className="muted-copy">No papers matched this search or year filter.</p>
                ) : null}
              </div>
            </section>
          </main>

          <aside className="pyp-side">
            <div className="pyp-side-card highlight">
              <Lock size={17} />
              <h3>Open paper access</h3>
              <p>Anyone can browse these papers. Login is required only for answer submission, saved progress, and PDF downloads.</p>
              <button type="button" onClick={gatedAction}>Login for saved features</button>
            </div>

            <div className="pyp-side-card">
              <h3>Coverage</h3>
              <p>{exam.papers} papers, {exam.totalQuestions} solved questions, and subject coverage for {exam.shortName}.</p>
            </div>
          </aside>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
