"use client"; // pour /app
import { useState } from "react";
import questions from "../../data/questions-merged.json";

type Question = {
  question: string;
  correct: string;
  incorrect: string[];
};

export default function Home() {
  // const [currentIndex, setCurrentIndex] = useState(250);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const question: Question = questions[currentIndex];
  const allAnswers = shuffle([question.correct, ...question.incorrect]);

  function shuffle(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{question.question}</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {allAnswers.map((answer) => {
          const isSelected = selected === answer;
          const isCorrect = answer === question.correct;

          const style: React.CSSProperties = {
            padding: "1rem",
            border: "2px solid lightgray",
            borderRadius: "8px",
            cursor: selected ? "default" : "pointer",
            backgroundColor: selected && isCorrect ? "lightgreen" : "white",
            borderColor:
              selected && isSelected
                ? isCorrect
                  ? "green"
                  : "red"
                : "lightgray",
          };

          return (
            <div
              key={answer}
              onClick={() => !selected && setSelected(answer)}
              style={style}
            >
              {answer}Test
            </div>
          );
        })}
      </div>

      {selected && currentIndex < questions.length - 1 && (
        <button
          onClick={handleNext}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Suivant
        </button>
      )}

      {selected && currentIndex === questions.length - 1 && (
        <p style={{ marginTop: "2rem", fontWeight: "bold" }}>
          🎉 Quiz terminé !
        </p>
      )}
    </main>
  );
}
