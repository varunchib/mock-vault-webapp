import { useParams, Link } from "react-router-dom";
import { questions } from "../data/questions";

const MockPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Mock Test - {id}</h1>

      {questions.map((q, index) => (
        <div key={q.id} className="mb-4 border p-4 rounded">
          <p>{q.question}</p>

          <Link to={`/question/${q.id}`} className="text-blue-500">
            Attempt →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MockPage;