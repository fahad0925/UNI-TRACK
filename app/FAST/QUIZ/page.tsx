"use client";
import { useEffect, useState } from "react";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import LightRays from "@/app/componenets/LightRays";
import { useLocalUniSubject } from "@/app/constants/UseLocalUniSubject";
import TopExamLoader from "@/app/ExamLoading";

interface QuestionItselfType {
  id: number;
  subject?: string;
  question: string;
  options: string[];
  correct: string;
}

interface Question {
  subject: string;
  questions: QuestionItselfType[];
}

const subjects = [
  ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"],
  ["Mathematics", "Physics", "Computer", "English"],
  ["Biology", "Chemistry", "Physics", "English"],
  ["Mathematics", "Physics", "Computer", "English", "Intelligence"],
];

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionItselfType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uniSubject, setUniSubject] = useLocalUniSubject();

  // For all-subjects flow
  const [subjectQueue, setSubjectQueue] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<
    { subject: string; score: number; total: number }[]
  >([]);

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleTryAgain = () => {
    setSelectedSubject(null);
    setQuestions([]);
    setSubjectQueue([]);
    setCurrentSubject(null);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAllResults([]);
    setTimeLeft(0);
  };

  // fetch next subject in the queue (or single subject)
  const fetchNextSubject = async (queue: string[]) => {
    if (!queue || queue.length === 0) {
      setShowResult(true);
      return;
    }

    const [next, ...rest] = queue;
    setCurrentSubject(next);
    setLoading(true);

    try {
      const data: Question = await fetchQuestionsBySubject(next);

      if (data && Array.isArray(data.questions) && data.questions.length > 0) {
        // Agar pehle subject complete ho gaya tha, uska result save karo
        if (currentSubject) {
          setAllResults((prev) => [
            ...prev,
            { subject: currentSubject, score, total: questions.length },
          ]);
        }

        // Reset quiz state for new subject
        setQuestions(data.questions);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSubjectQueue(rest);
        setSelected(null);

        // Timer reset
        setTimeLeft(data.questions.length * 60);
      } else {
        console.error(`❌ No questions for ${next}, skipping...`);
        setTimeout(() => fetchNextSubject(rest), 200);
      }
    } catch (err) {
      console.error(`❌ Error fetching ${next}:`, err);
      setTimeout(() => fetchNextSubject(rest), 200);
    } finally {
      setLoading(false);
    }
  };

  // When a subject is selected (single or "All")
  useEffect(() => {
    if (!selectedSubject) return;

    const isAll =
      selectedSubject ===
      (uniSubject == 0
        ? "Fast"
        : uniSubject == 1
        ? "NED"
        : uniSubject == 2
        ? "DOW"
        : "NUST");

    if (isAll) {
      const uniSubjects = subjects[uniSubject] ?? [];
      setSubjectQueue(uniSubjects);
      fetchNextSubject(uniSubjects);
    } else {
      fetchNextSubject([selectedSubject]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject]);

  // Reset selected when question/subject changes
  useEffect(() => {
    setSelected(null);
  }, [currentIndex, currentSubject]);

  // ✅ Timer countdown + auto-submit on time over
  useEffect(() => {
    if (showResult) return;
    if (timeLeft <= 0 && questions.length > 0) {
      if (currentSubject) {
        setAllResults((prev) => [
          ...prev,
          { subject: currentSubject, score, total: questions.length },
        ]);
      }
      setShowResult(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, showResult]);

  // Format timer
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Handle skip
  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (subjectQueue.length > 0) {
        fetchNextSubject(subjectQueue);
      } else {
        // last subject ka result save
        if (currentSubject) {
          setAllResults((prev) => [
            ...prev,
            { subject: currentSubject, score, total: questions.length },
          ]);
        }
        setShowResult(true);
      }
    }
  };

  // Handle answer
  const handleAnswer = (option: string) => {
    setSelected(option);

    if (option === questions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        if (subjectQueue.length > 0) {
          fetchNextSubject(subjectQueue);
        } else {
          if (currentSubject) {
            setAllResults((prev) => [
              ...prev,
              { subject: currentSubject, score, total: questions.length },
            ]);
          }
          setShowResult(true);
        }
      }
    }, 800);
  };

  // Loading screen
  if (loading) return <TopExamLoader />;

  // Initial subject selection
  if (!selectedSubject) {
    return (
      <div className="bg-gradient-to-r from-cyan-700 via-cyan-950 to-black min-h-screen flex justify-center items-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
            Choose a Subject
          </h1>
          <div className="grid gap-4">
            <button
              onClick={() =>
                setSelectedSubject(
                  `${
                    uniSubject == 0
                      ? "Fast"
                      : uniSubject == 1
                      ? "NED"
                      : uniSubject == 2
                      ? "DOW"
                      : "NUST"
                  }`
                )
              }
              className="p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
            >
              All Subjects
            </button>
            {subjects[uniSubject]?.map((subj, i) => (
              <button
                key={i}
                onClick={() => setSelectedSubject(subj)}
                className="p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No questions fallback
  if (!questions.length)
    return (
      <div className="bg-gradient-to-r from-cyan-700 via-cyan-950 to-black min-h-screen flex flex-col gap-5 justify-center items-center">
        <p className="text-center text-red-500 text-lg font-semibold">
          ❌ No questions generated for {currentSubject || selectedSubject}
        </p>
        <button
          onClick={handleTryAgain}
          className="bg-cyan-800 text-white px-10 py-3 rounded-lg hover:bg-cyan-950 transition duration-300"
        >
          Try Again
        </button>
      </div>
    );

  const currentQuestion = questions[currentIndex];

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

      <div className=" py-10 px-4  sm:p-10 min-h-screen relative flex flex-col gap-5 justify-center bg-gradient-to-r from-cyan-950 via-cyan-950 to-black">
        {/* Subject Title + Timer */}
        <div className="flex flex-col  justify-center items-center mb-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
            {currentSubject || selectedSubject}
          </h1>
          <span className="text-lg text-cyan-400 font-semibold">
            ⏳ {formatTime(timeLeft)}
          </span>
        </div>

        <div className="mx-auto z-50 gap-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-lg p-5 sm:p-12 max-w-xl flex flex-col items-center w-full text-white">
          {!showResult ? (
            <>
              <p className="text-sm text-gray-100 mb-2 text-center">
                Question {currentIndex + 1} of {questions.length}
              </p>

              <h1 className="text-xl font-semibold text-gray-100 mb-6">
                {currentQuestion?.question}
              </h1>

              <div className="grid gap-3 w-full">
                {currentQuestion?.options.map((option, i) => (
                  <button
                    key={`${currentSubject ?? selectedSubject}-${
                      currentQuestion.id
                    }-${i}`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    className={`p-2 sm:p-3 rounded-2xl sm:rounded-xl text-cyan-900 border transition 
    whitespace-normal break-words text-center w-full
    ${
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

                {/* ✅ Button responsive fix */}
                <button
                  disabled={currentIndex >= questions.length - 1}
                  onClick={handleSkip}
                  className="p-2 sm:p-3 rounded-2xl text-cyan-300 w-full border border-cyan-200 hover:bg-cyan-950"
                >
                  SKIP
                </button>
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-100 mb-6">
                🎉 Quiz Completed
              </h2>

              {/* Overall Result */}
              <p className="text-xl text-gray-100 mb-6">
                {allResults.length > 0 ? (
                  <>
                    <span className="font-bold text-cyan-400">
                      Combined Results
                    </span>
                    <ul className="mt-4 text-left">
                      {allResults.map((res, idx) => (
                        <li key={idx} className="mb-2">
                          {res.subject}:{" "}
                          <span className="text-cyan-300 font-semibold">
                            {res.score}/{res.total}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    Your Score:{" "}
                    <span className="font-bold text-cyan-600">
                      {score} / {questions.length}
                    </span>
                  </>
                )}
              </p>

              <button
                onClick={handleTryAgain}
                className="bg-cyan-950 text-white px-10 py-3 rounded-lg hover:bg-sky-700 transition duration-300"
              >
                Back to Subjects
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
