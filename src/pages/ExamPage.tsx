import { useParams, Link } from "react-router-dom";

const ExamPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exam: {id}</h1>

      <Link to={`/mock/${id}`} className="underline">
        Start Mock Test →
      </Link>
    </div>
  );
};

export default ExamPage;