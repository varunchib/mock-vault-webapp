import { useParams } from "react-router-dom";
import { questions } from "../data/questions";
import { useState } from "react";

const QuestionPage = () => {
  const { id } = useParams();
  const question = questions.find(q => q.id === id);

  const [selected, setSelected] = useState<number | null>(null);

  if (!question) return <div>Question not found</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        {question.question}
      </h2>

      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={`block w-full text-left p-3 border mb-2 rounded
          ${
            selected !== null
              ? i === question.answer
                ? "bg-green-100"
                : i === selected
                ? "bg-red-100"
                : ""
              : ""
          }`}
        >
          {opt}
        </button>
      ))}

      {selected !== null && (
        <div className="mt-4 p-3 border rounded bg-green-50">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};

export default QuestionPage;