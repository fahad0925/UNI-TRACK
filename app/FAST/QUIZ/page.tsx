"use client";
import React, { useEffect, useState } from "react";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import { QuestionItselfType } from "@/app/constants/questions";
import LightRays from "@/app/componenets/LightRays";

const subjects = ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"];

const Page = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionItselfType[]>([]);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch questions whenever subject changes
  useEffect(() => {
    if (selectedSubject) {
      setLoading(true);
      fetchQuestionsBySubject(selectedSubject)
        .then((data) => {
          const total = data.questions.length;
          let allIndexes = Array.from({ length: total }, (_, i) => i);
          allIndexes = allIndexes.sort(() => Math.random() - 0.5).slice(0, 20);

          setQuestions(data.questions);
          setQuestionOrder(allIndexes);
          setCurrentIndex(0);
          setScore(0);
          setShowResult(false);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSubject]);

  // Subject selection screen
  if (!selectedSubject) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-950 via-cyan-950 to-black">
        <div className="max-w-xl  mx-auto  backdrop-blur-xl bg-white/7 border border-white/30 shadow-lg rounded-2xl p-10  w-full sm:-mt-[13vh]">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Choose a Subject
          </h1>
          <div className="grid gap-4">
            {subjects.map((subj, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubject(subj)}
                className="p-3 bg-cyan-950 text-white rounded-lg hover:bg-cyan-800 transition"
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading || questionOrder.length === 0) return <p>..loading</p>;

  const currentQuestion = questions[questionOrder[currentIndex]];

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
    <>
      <div style={{ width: "100%", position: "absolute" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays top-0 z-1"
        />
      </div>
      <div className=" p-10 min-h-screen  relative flex flex-col gap-5 justify-center   bg-gradient-to-r from-cyan-950 via-cyan-950 to-black">
        <h1 className=" text-3xl sm:text-6xl z-12 text-center font-bold text-gray-100 mb-4 sm:-mt-[10vh] ">
          {selectedSubject}
        </h1>

        <div className=" mx-auto z-50 gap-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-lg p-5  sm:p-12 max-w-xl flex flex-col items-center  w-full text-white ">
          {!showResult ? (
            <>
              <p className="text-lg text-gray-100 mb-2">
                Question {currentIndex + 1} of {questionOrder.length}
              </p>

              <h1 className="text-xl font-semibold text-gray-100 mb-4">
                {currentQuestion?.question}
              </h1>

              <div className="grid gap-3">
                {currentQuestion?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    className={` p-2 sm:p-3  rounded-2xl  sm:rounded-xl text-cyan-900 px-[13vh]  sm:px-[20vh] border transition ${
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
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                Quiz Completed 🎉
              </h2>
              <p className="text-lg text-gray-100 mb-4">
                Your Score:{" "}
                <span className="font-bold text-xl text-white">
                  {score} / {questionOrder.length}
                </span>
              </p>
              <button
                onClick={() => setSelectedSubject(null)}
                className="bg-cyan-950 text-white px-10 py-3 rounded-lg hover:bg-sky-700 transition"
              >
                Back to Subjects
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
