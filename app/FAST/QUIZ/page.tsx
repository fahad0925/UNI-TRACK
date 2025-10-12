"use client";
import { useEffect, useRef, useState } from "react";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import { useLocalUniSubject } from "@/app/constants/UseLocalUniSubject";
import TopExamLoader from "@/app/ExamLoading";
import LightRays from "@/app/componenets/LightRays";

// --- INTERFACES (NO CHANGES) ---
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

// --- CONSTANTS (NO CHANGES) ---
const subjects = [
  ["Mathematics", "Physics", "Computer", "English", "Intelligence"], // 0: FAST
  ["Mathematics", "Physics", "Chemistry", "English", "IQ"], // 1: NED
  ["Biology", "Chemistry", "Physics", "English"], // 2: DOW
  ["Mathematics", "Physics", "Chemistry", "English", "IQ"], // 3: NUST
  ["Mathematics", "Physics", "Computer", "English", "Intelligence"], // 4: QUEST
  ["Mathematics", "English", "Computer", "IQ"], // 5: IQRA
  ["Mathematics", "Physics", "Chemistry", "English", "IQ"], // 6: MUET
  ["Mathematics", "Physics", "Computer", "English"], // 7: UOK
  ["Mathematics", "English", "IQ", "General Knowledge"], // 8: IBA
  ["Mathematics", "English", "Analytical Reasoning", "IQ"], // 9: LUMS
  ["Mathematics", "Physics", "Chemistry", "English", "IQ"], // 10: GIKI
  ["Mathematics", "Physics", "Computer", "English"], // 11: COMSATS
  ["Mathematics", "Physics", "English", "IQ"], // 12: PU
  ["Mathematics", "Physics", "Computer", "English", "IQ"], // 13: SSUET
  ["Mathematics", "Physics", "Computer", "English", "Intelligence"], // 14: MAJU
  ["Mathematics", "Physics", "Computer", "English", "IQ"], // 15: Bahria
];

// --- MAIN COMPONENT (LOGIC UNCHANGED, UI ENHANCED) ---
export default function QuizPage() {
  // --- STATE AND REFS (NO CHANGES) ---
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionItselfType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  const [subjectQueue, setSubjectQueue] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<
    { subject: string; score: number; total: number }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [skippedBySubject, setSkippedBySubject] = useState<
    Record<string, QuestionItselfType[]>
  >({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState<QuestionItselfType[]>(
    []
  );
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewAnswered, setReviewAnswered] = useState<boolean[]>([]);
  const [reviewSubject, setReviewSubject] = useState<string | null>(null);
  const [currentTotalQuestions, setCurrentTotalQuestions] = useState<number>(0);
  const [subjectTotals, setSubjectTotals] = useState<Record<string, number>>(
    {}
  );
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>(
    {}
  );
  const subjectScoresRef = useRef(subjectScores);
  const fetchAttemptsRef = useRef<Record<string, number>>({});

  // --- NEW REF FOR 3D CARD EFFECT ---
  const cardRef = useRef<HTMLDivElement>(null);

  // --- HOOKS AND HANDLERS (LOGIC UNCHANGED) ---
  useEffect(() => {
    subjectScoresRef.current = subjectScores;
  }, [subjectScores]);
  const handleTryAgain = () => {
    /* ...logic... */ setSelectedSubject(null);
    setQuestions([]);
    setSubjectQueue([]);
    setCurrentSubject(null);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAllResults([]);
    setTimeLeft(0);
    setSkippedBySubject({});
    setReviewMode(false);
    setReviewQuestions([]);
    setReviewIndex(0);
    setReviewTotal(0);
    setReviewAnswered([]);
    setReviewSubject(null);
    setCurrentTotalQuestions(0);
    setSubjectTotals({});
    setSubjectScores({});
    subjectScoresRef.current = {};
    fetchAttemptsRef.current = {};
  };
  const computeAllResults = () => {
    const subjectsSeen = Object.keys(subjectTotals);
    const results = subjectsSeen.map((s) => ({
      subject: s,
      score: subjectScoresRef.current[s] ?? 0,
      total: subjectTotals[s] ?? 0,
    }));
    setAllResults(results);
  };
  const fetchNextSubject = async (queue: string[]) => {
    if (!queue || queue.length === 0) {
      computeAllResults();
      setShowResult(true);
      return;
    }
    const [next, ...rest] = queue;
    setCurrentSubject(next);
    setLoading(true);
    try {
      const data: Question = await fetchQuestionsBySubject(next);
      if (data && Array.isArray(data.questions) && data.questions.length > 0) {
        if (fetchAttemptsRef.current[next])
          delete fetchAttemptsRef.current[next];
        setSubjectTotals((prev) => ({
          ...prev,
          [next]: data.questions.length,
        }));
        setSubjectScores((prev) => ({ ...prev, [next]: prev[next] ?? 0 }));
        setQuestions(data.questions);
        setCurrentIndex(0);
        setScore(subjectScoresRef.current[next] ?? 0);
        setShowResult(false);
        setSubjectQueue(rest);
        setSelected(null);
        setTimeLeft(data.questions.length * 60);
        setCurrentTotalQuestions(data.questions.length);
      } else {
        setTimeout(() => fetchNextSubject(rest), 200);
      }
    } catch (err) {
      const attempts = (fetchAttemptsRef.current[next] ?? 0) + 1;
      fetchAttemptsRef.current[next] = attempts;
      console.error(`❌ Error fetching ${next} (attempt ${attempts}):`, err);
      if (attempts >= 3) {
        console.warn(
          `⚠️ Skipping subject ${next} after ${attempts} failed fetch attempts.`
        );
        setSubjectTotals((prev) => ({ ...prev, [next]: 0 }));
        setSubjectScores((prev) => ({ ...prev, [next]: prev[next] ?? 0 }));
        setTimeout(() => fetchNextSubject(rest), 200);
      } else {
        setTimeout(() => fetchNextSubject([next, ...rest]), 500);
      }
    } finally {
      setLoading(false);
    }
  };
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
  }, [selectedSubject, uniSubject]);
  useEffect(() => {
    setSelected(null);
  }, [currentIndex, currentSubject]);
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
  }, [timeLeft, showResult, questions.length]);
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  const findNextUnanswered = (start: number, arr: boolean[]) => {
    const len = arr.length;
    for (let i = start; i < len; i++) if (!arr[i]) return i;
    for (let i = 0; i < start; i++) if (!arr[i]) return i;
    return -1;
  };
  const handleSkip = () => {
    const currQ = questions[currentIndex];
    if (!currQ) return;
    const subj = currentSubject ?? selectedSubject ?? "Unknown";
    setSkippedBySubject((prev) => {
      const existing = prev[subj] || [];
      if (existing.some((q) => q.id === currQ.id)) return prev;
      return { ...prev, [subj]: [...existing, currQ] };
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (subjectQueue.length > 0) {
        fetchNextSubject(subjectQueue);
      } else {
        computeAllResults();
        setShowResult(true);
      }
    }
  };
  const handleAnswer = (option: string) => {
    if (reviewMode) {
      const q = reviewQuestions[reviewIndex];
      if (!q || reviewAnswered[reviewIndex]) return;
      setSelected(option);
      const correct = option === q.correct;
      if (correct) {
        const subj =
          reviewSubject ??
          q.subject ??
          currentSubject ??
          selectedSubject ??
          "Unknown";
        const prevScore = subjectScoresRef.current[subj] ?? 0;
        const newScore = prevScore + 1;
        setSubjectScores((prev) => ({ ...prev, [subj]: newScore }));
        if (subj === currentSubject) setScore(newScore);
      }
      setTimeout(() => {
        setSelected(null);
        setReviewAnswered((prev) => {
          const newArr = [...prev];
          newArr[reviewIndex] = true;
          setSkippedBySubject((prevSkipped) => {
            const subjKey = reviewSubject ?? q.subject ?? "Unknown";
            const remaining = (prevSkipped[subjKey] || []).filter(
              (qq) => qq.id !== q.id
            );
            const copy = { ...prevSkipped };
            if (remaining.length > 0) copy[subjKey] = remaining;
            else delete copy[subjKey];
            return copy;
          });
          const next = findNextUnanswered(reviewIndex + 1, newArr);
          if (next === -1) {
            setReviewMode(false);
            setReviewSubject(null);
            computeAllResults();
            setShowResult(true);
          } else {
            setReviewIndex(next);
          }
          return newArr;
        });
      }, 700);
      return;
    }
    const qn = questions[currentIndex];
    if (!qn) return;
    setSelected(option);
    const isCorrect = option === qn.correct;
    if (isCorrect) {
      const subj = currentSubject ?? selectedSubject ?? "Unknown";
      const prev = subjectScoresRef.current[subj] ?? 0;
      const newScore = prev + 1;
      setSubjectScores((prev) => ({ ...prev, [subj]: newScore }));
      setScore(newScore);
    }
    setTimeout(() => {
      setSelected(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        if (subjectQueue.length > 0) {
          fetchNextSubject(subjectQueue);
        } else {
          computeAllResults();
          setShowResult(true);
        }
      }
    }, 700);
  };
  const startReview = (subject: string) => {
    const list = skippedBySubject[subject] || [];
    if (list.length === 0) return;
    setReviewQuestions(list);
    setReviewTotal(list.length);
    setReviewAnswered(new Array(list.length).fill(false));
    setReviewIndex(0);
    setReviewMode(true);
    setReviewSubject(subject);
    setShowResult(false);
    setSelected(null);
  };

  // --- NEW EFFECT FOR 3D CARD TILT ---
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = -1 * ((y - height / 2) / (height / 2)) * 5; // Max 5 deg rotation
      const rotateY = ((x - width / 2) / (width / 2)) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    };
    const handleMouseLeave = () => {
      if (card)
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cardRef, selectedSubject, showResult]);

  // --- RENDER LOGIC (UI ENHANCEMENTS) ---
  if (loading) return <TopExamLoader />;

  // --- UI STATE 1: SUBJECT SELECTION ---
  if (!selectedSubject) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-900 p-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -left-40 -top-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-blob" />
          <div className="absolute right-0 top-20 w-80 h-80 bg-violet-600 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto bg-black/50 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-cyan-500/10 animate-cardEntrance">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
            Admission Test Portal
          </h1>
          <div className="grid gap-4">
            <button
              onClick={() =>
                setSelectedSubject(
                  uniSubject == 0
                    ? "Fast"
                    : uniSubject == 1
                    ? "NED"
                    : uniSubject == 2
                    ? "DOW"
                    : "NUST"
                )
              }
              className="group relative p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine" />
              <span className="relative">Start with All Subjects</span>
            </button>
            {subjects[uniSubject]?.map((subj, i) => (
              <button
                key={i}
                onClick={() => setSelectedSubject(subj)}
                style={{ animationDelay: `${i * 100}ms` }}
                className="p-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transform transition-all duration-300 hover:scale-[1.03] animate-staggerIn"
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
        <style jsx>{`
          .bg-grid-pattern {
            background-image: linear-gradient(
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px
              );
            background-size: 2rem 2rem;
          }
          .animate-blob {
            animation: blob 8s infinite ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: -2s;
          }
          @keyframes blob {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-cardEntrance {
            animation: cardEntrance 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
          @keyframes cardEntrance {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-staggerIn {
            opacity: 0;
            animation: staggerIn 0.5s ease-out forwards;
          }
          @keyframes staggerIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-shine {
            animation: shine 1.5s infinite linear;
          }
          @keyframes shine {
            0% {
              transform: translateX(-150%) skewX(-30deg);
            }
            100% {
              transform: translateX(150%) skewX(-30deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!questions.length && !showResult)
    return (
      <div className="min-h-screen flex flex-col gap-5 justify-center items-center bg-gray-900">
        <p className="text-center text-red-400 text-xl font-semibold animate-pulse">
          ❌ No questions available for {currentSubject || selectedSubject}.
        </p>
        <button
          onClick={handleTryAgain}
          className="px-8 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );

  const displayedQuestion = reviewMode
    ? reviewQuestions[reviewIndex]
    : questions[currentIndex];
  const displayedIndex = reviewMode ? reviewIndex : currentIndex;
  const displayedTotal = reviewMode ? reviewTotal : questions.length;
  const progressPercentage =
    displayedTotal > 0 ? ((currentIndex + 1) / displayedTotal) * 100 : 0;

  return (
    <>
      <div className="absolute inset-0 w-full h-full -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="rgba(0, 200, 255, 0.3)"
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.3}
          noiseAmount={0.1}
        />
      </div>
      <div className="py-10 px-4 sm:p-10 min-h-screen w-full relative flex flex-col gap-5 justify-center items-center bg-gray-900/50">
        <div className="flex flex-col justify-center items-center mb-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 animate-fadeInDown">
            {reviewMode
              ? `Reviewing: ${reviewSubject}`
              : currentSubject || selectedSubject}
          </h1>
          {!showResult && (
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="text-lg text-cyan-300 font-mono">
                ⏳ {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        <div
          ref={cardRef}
          className="mx-auto z-10 w-full max-w-2xl bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-cyan-500/10 p-5 sm:p-8 flex flex-col items-center transition-transform duration-200 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {showResult && <Confetti />}
          {!showResult ? (
            <div key={currentIndex} className="w-full animate-fadeInUp">
              <div className="w-full bg-white/10 rounded-full h-2.5 mb-6">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-300 mb-4 text-center">
                Question {displayedIndex + 1} of {displayedTotal}
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center min-h-[6rem] flex items-center justify-center">
                {displayedQuestion?.question}
              </h2>
              <div className="grid gap-4 w-full">
                {displayedQuestion?.options.map((option, i) => (
                  <button
                    key={`${displayedQuestion.id}-${i}`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    style={{ animationDelay: `${i * 75}ms` }}
                    className={`animate-staggerIn p-4 rounded-xl text-left w-full font-medium transition-all duration-300 transform disabled:cursor-not-allowed ${
                      selected === option
                        ? option === displayedQuestion.correct
                          ? "bg-green-500 border-green-400 text-white scale-105"
                          : "bg-red-500 border-red-400 text-white scale-105"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-[1.02]"
                    }`}
                  >
                    <span className="font-bold mr-3">
                      {String.fromCharCode(65 + i)}.
                    </span>{" "}
                    {option}
                  </button>
                ))}
                {!reviewMode && (
                  <button
                    onClick={handleSkip}
                    className="mt-4 p-3 rounded-xl text-gray-300 w-full border border-gray-600 hover:bg-gray-800 transition-colors"
                  >
                    SKIP
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col justify-center items-center w-full animate-fadeInUp">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4">
                🎉 Quiz Completed! 🎉
              </h2>
              <div className="w-full bg-white/5 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">Final Results</h3>
                <ul className="space-y-3 text-left">
                  {allResults.map((res, idx) => (
                    <li
                      key={idx}
                      style={{ animationDelay: `${idx * 100}ms` }}
                      className="flex justify-between items-baseline text-lg animate-staggerIn"
                    >
                      <span>{res.subject}:</span>
                      <span className="font-semibold text-cyan-300">
                        {res.score}/{res.total}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {Object.values(skippedBySubject).flat().length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Review Skipped Questions
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(skippedBySubject).map(([subj, list]) =>
                      list && list.length > 0 ? (
                        <button
                          key={subj}
                          onClick={() => startReview(subj)}
                          className="px-5 py-2 rounded-full bg-yellow-500/20 border border-yellow-500 text-yellow-300 hover:bg-yellow-500/30 transition-colors"
                        >
                          Review {list.length} {subj}
                        </button>
                      ) : null
                    )}
                  </div>
                </div>
              )}
              <button
                onClick={handleTryAgain}
                className="bg-cyan-600 text-white px-10 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 transform hover:scale-105"
              >
                Back to Subjects
              </button>
            </div>
          )}
        </div>
        <style jsx>{`
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInDown {
            animation: fadeInDown 0.5s ease-out forwards;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-staggerIn {
            opacity: 0;
            animation: staggerIn 0.5s ease-out forwards;
          }
          @keyframes staggerIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}

// --- NEW CONFETTI COMPONENT FOR RESULTS SCREEN ---
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            backgroundColor: ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"][
              Math.floor(Math.random() * 4)
            ],
          }}
        />
      ))}
      <style jsx>{`
        .confetti {
          position: absolute;
          width: 8px;
          height: 16px;
          opacity: 0;
          animation: fall 4s linear infinite;
        }
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotateZ(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
