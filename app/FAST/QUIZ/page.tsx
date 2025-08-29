"use client";
import { questions } from "@/app/constants/questions";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // When subject is chosen → prepare 20 random questions
  useEffect(() => {
    if (selectedSubject !== null) {
      const total = questions[selectedSubject].questions.length;
      let allIndexes = Array.from({ length: total }, (_, i) => i);
      allIndexes = allIndexes.sort(() => Math.random() - 0.5).slice(0, 20);
      setQuestionOrder(allIndexes);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
    }
  }, [selectedSubject]);

  // If subject not chosen → show subject selection screen
  if (selectedSubject === null) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-950 via-gray-950 to-black">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border w-full">
          <h1 className="text-lg font-bold text-center text-black mb-6">
            Choose a Subject
          </h1>
          <div className="grid gap-4">
            {questions.map((subj, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubject(index)}
                className="p-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
              >
                {subj.subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If no questions yet (loading random 20)
  if (questionOrder.length === 0) return <p>Loading...</p>;

  const currentQuestion =
    questions[selectedSubject].questions[questionOrder[currentIndex]];

  const handleAnswer = (option: string) => {
    setSelected(option);

    if (option === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questionOrder.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  return (
    <div className="bg-gradient-to-r p-10 min-h-screen flex justify-center items-start from-blue-950 via-gray-950 to-black">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full">
        <h1 className="text-lg text-center font-bold text-gray-800 mb-4">
          {questions[selectedSubject]?.subject}
        </h1>

        {!showResult ? (
          <>
            <p className="text-sm text-gray-500 mb-2">
              Question {currentIndex + 1} of {questionOrder.length}
            </p>

            <h1 className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestion?.question}
            </h1>

            <div className="grid gap-3">
              {currentQuestion?.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                  className={`p-3 rounded-lg border transition ${
                    selected === option
                      ? option === currentQuestion.correct
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-red-500 text-white border-red-600"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Completed 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Your Score:{" "}
              <span className="font-bold text-sky-600">
                {score} / {questionOrder.length}
              </span>
            </p>
            <button
              onClick={() => setSelectedSubject(null)}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
            >
              Back to Subjects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
