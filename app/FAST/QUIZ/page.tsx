"use client";
import { useEffect, useRef, useState } from "react";
import { fetchQuestionsBySubject } from "@/app/constants/getQuestions";
import { useLocalUniSubject } from "@/app/constants/UseLocalUniSubject";
import TopExamLoader from "@/app/ExamLoading";
import LightRays from "@/app/componenets/LightRays";

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

  const [subjectQueue, setSubjectQueue] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<
    { subject: string; score: number; total: number }[]
  >([]);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Skipped grouped by subject
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

  // ref to avoid stale closures for subjectScores
  const subjectScoresRef = useRef(subjectScores);
  useEffect(() => {
    subjectScoresRef.current = subjectScores;
  }, [subjectScores]);

  // track fetch attempts per subject to avoid infinite retries
  const fetchAttemptsRef = useRef<Record<string, number>>({});

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

  // fetch next subject in the queue (or single subject)
  // added simple attempt limiting per-subject to avoid infinite retry loops
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
        // reset attempts for this subject on success
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
        // no questions for this subject: skip after small delay
        setTimeout(() => fetchNextSubject(rest), 200);
      }
    } catch (err) {
      // increment attempt count and skip subject after 3 tries
      const attempts = (fetchAttemptsRef.current[next] ?? 0) + 1;
      fetchAttemptsRef.current[next] = attempts;
      console.error(`❌ Error fetching ${next} (attempt ${attempts}):`, err);

      if (attempts >= 3) {
        // skip this subject permanently after 3 failed attempts
        console.warn(
          `⚠️ Skipping subject ${next} after ${attempts} failed fetch attempts.`
        );
        // still record a placeholder total so results include this subject
        setSubjectTotals((prev) => ({ ...prev, [next]: 0 }));
        setSubjectScores((prev) => ({ ...prev, [next]: prev[next] ?? 0 }));
        setTimeout(() => fetchNextSubject(rest), 200);
      } else {
        // retry same subject after delay
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
    // include uniSubject so changes to it also re-run (safe)
  }, [selectedSubject, uniSubject]);

  // Reset selected option when question/subject changes
  useEffect(() => {
    setSelected(null);
  }, [currentIndex, currentSubject]);

  // Timer countdown + auto-submit on time over
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
    // include questions.length to avoid stale reads
  }, [timeLeft, showResult, questions.length]);

  // Format timer
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

  // Add current question to skipped map under its subject
  const handleSkip = () => {
    const currQ = questions[currentIndex];
    if (!currQ) return; // guard: nothing to skip

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

  // Handle answer (works for both normal and review)
  const handleAnswer = (option: string) => {
    if (reviewMode) {
      const q = reviewQuestions[reviewIndex];
      if (!q) return;
      if (reviewAnswered[reviewIndex]) return; // already answered

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

        // Mark answered locally and decide next index inside updater (to avoid stale state)
        setReviewAnswered((prev) => {
          const newArr = [...prev];
          newArr[reviewIndex] = true;

          // Remove solved question from skippedBySubject and delete key if empty
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

          // Find next unanswered review question
          const next = findNextUnanswered(reviewIndex + 1, newArr);
          if (next === -1) {
            // finished reviewing this subject
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

    // Normal (non-review) mode
    const qn = questions[currentIndex];
    if (!qn) return; // guard: question may be undefined due to race

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

  // Start reviewing skipped questions for a specific subject
  const startReview = (subject: string) => {
    const list = skippedBySubject[subject] || [];
    if (list.length === 0) return;

    setReviewQuestions(list);
    setReviewTotal(list.length);
    setReviewAnswered(new Array(list.length).fill(false));
    setReviewIndex(0);
    setReviewMode(true);
    setReviewSubject(subject); // show this subject in header while reviewing
    setShowResult(false);
    setSelected(null);
  };

  if (loading) return <TopExamLoader />;

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

  if (!questions.length && !showResult)
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

  const displayedQuestion = reviewMode
    ? reviewQuestions[reviewIndex]
    : questions[currentIndex];

  const displayedIndex = reviewMode ? reviewIndex : currentIndex;
  const displayedTotal = reviewMode ? reviewTotal : questions.length;

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
          className="custom-rays top-0 z-10"
        />
      </div>

      <div className=" py-10 px-4  sm:p-10 min-h-screen relative flex flex-col gap-5 justify-center bg-gradient-to-r from-cyan-950 via-cyan-950 to-black">
        <div className="flex flex-col  justify-center items-center mb-4">
          {/* show reviewSubject while reviewing, otherwise show currentSubject or selectedSubject */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
            {reviewMode ? reviewSubject : currentSubject || selectedSubject}
          </h1>
          <span className="text-lg text-cyan-400 font-semibold">
            ⏳ {formatTime(timeLeft)}
          </span>
        </div>

        <div className="mx-auto z-50 gap-2 backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-lg p-5 sm:p-12 max-w-xl flex flex-col items-center w-full text-white">
          {!showResult ? (
            <>
              <p className="text-sm text-gray-100 mb-2 text-center">
                Question {displayedIndex + 1} of {displayedTotal}
              </p>

              <h1 className="text-xl font-semibold text-gray-100 mb-6">
                {displayedQuestion?.question}
              </h1>

              <div className="grid gap-3 w-full">
                {displayedQuestion?.options.map((option, i) => (
                  <button
                    key={`${reviewMode ? "review" : "live"}-${
                      (reviewMode ? reviewSubject : currentSubject) ??
                      selectedSubject
                    }-${displayedQuestion.id}-${i}`}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    className={`p-2 sm:p-3 rounded-2xl sm:rounded-xl text-cyan-900 border transition 
    whitespace-normal break-words text-center w-full
    ${
      selected === option
        ? option === displayedQuestion.correct
          ? "bg-green-500 text-white border-green-600"
          : "bg-red-500 text-white border-red-600"
        : "bg-gray-50 hover:bg-gray-100 border-gray-300"
    }`}
                  >
                    {option}
                  </button>
                ))}

                {!reviewMode && (
                  <button
                    onClick={handleSkip}
                    className="p-2 sm:p-3 rounded-2xl text-cyan-300 w-full border border-cyan-200 hover:bg-cyan-950"
                  >
                    SKIP
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-100 mb-6">
                🎉 Quiz Completed
              </h2>

              <div className="text-xl text-gray-100 mb-6">
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
                    <span>
                      Your Score:{" "}
                      <span className="font-bold text-cyan-600">
                        {score} / {questions.length}
                      </span>
                    </span>
                  </>
                )}
              </div>

              {/* Show skipped grouped by subject (only subjects that still have skipped questions) */}
              {Object.entries(skippedBySubject).map(([subj, list]) =>
                list && list.length > 0 ? (
                  <div key={subj} className="mt-6">
                    <button
                      onClick={() => startReview(subj)}
                      className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition"
                    >
                      Solve {list.length} {subj} Skipped Questions
                    </button>
                  </div>
                ) : null
              )}

              <button
                onClick={handleTryAgain}
                className="bg-cyan-950 text-white px-10 py-3 rounded-lg hover:bg-sky-700 transition duration-300 mt-4"
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
