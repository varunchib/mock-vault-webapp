import { Download, FileText, Play, Search } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LoginModal } from "../components/auth/LoginModal";
import { HaloLoader } from "../components/common/HaloLoader";
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
    ? `${exam.shortName} previous year question papers with solutions, answers, and year-wise practice.`
    : "Browse previous year question papers with solutions and explanations.";

  usePageMeta({
    title,
    description,
    canonicalPath: exam ? `/${exam.slug}-exam/previous-year-papers` : "/previous-year-papers",
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
      const normalizedQuery = query.trim().toLowerCase();
      const matchesYear = activeYear === "All" || paper.year === activeYear;
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
      <section className="paper-list-page">
        <div className="paper-list-shell">
          <HaloLoader label="Loading papers" />
        </div>
      </section>
    );
  }

  if (error || !exam) return <Navigate to="/exam" replace />;

  const homeHref = isAuthenticated ? "/dashboard" : "/";
  const openPdf = (paperSlug: string) => {
    if (!isAuthenticated) { setLoginOpen(true); return }
    window.open(`/pyq/${paperSlug}`, '_blank')
  };

  return (
    <section className="paper-list-page">
      <div className="paper-list-shell">
        <nav className="crumbs compact" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <Link to={`/exam/${exam.slug}`}>{exam.shortName}</Link>
          <span>/</span>
          <span>Previous Year Papers</span>
        </nav>

        <header className="paper-list-head">
          <div>
            <small>{exam.category}</small>
            <h1>{exam.shortName} previous year papers</h1>
            <p>{exam.name} papers with solved questions, answer keys, and year-wise practice.</p>
          </div>
          <div className="paper-list-stats">
            <span>{exam.papers} papers</span>
            <span>{exam.totalQuestions} questions</span>
          </div>
        </header>

        <section className="paper-list-controls">
          <label>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${exam.shortName} papers...`}
            />
          </label>
          <div>
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
          </div>
        </section>

        <section className="paper-table">
          <div className="paper-table-head">
            <span>Paper</span>
            <span>Year</span>
            <span>Questions</span>
            <span>Action</span>
          </div>

          {filteredPapers.map((paper) => (
            <article className="paper-table-row" key={paper.slug}>
              <div className="paper-title-cell">
                <FileText size={18} />
                <div>
                  <Link to={`/pyq/${paper.slug}`}>{paper.title}</Link>
                  <small>{paper.shift} - {paper.subjects.slice(0, 3).join(", ")}</small>
                </div>
              </div>
              <span>{paper.year}</span>
              <span>{paper.questions}</span>
              <div className="paper-row-actions">
                <button type="button" onClick={() => navigate(`/pyq/${paper.slug}`)}>
                  <Play size={15} /> Attempt
                </button>
                <button type="button" onClick={() => openPdf(paper.slug)}>
                  <Download size={15} /> PDF
                </button>
              </div>
            </article>
          ))}

          {filteredPapers.length === 0 ? <p>No papers matched this search.</p> : null}
        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
