"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickMathProps {
  onWin: () => void;
}

interface Problem {
  text: string;
  answer: boolean;
}

const generateProblem = (): Problem => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  let operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];

  let expectedResult: number;
  if (operator === "+") expectedResult = num1 + num2;
  else if (operator === "-") expectedResult = num1 - num2;
  else expectedResult = num1 * num2;

  // 50% chance the displayed result is correct
  const isCorrectlyStated = Math.random() < 0.5;
  let displayedResult: number;

  if (isCorrectlyStated) {
    displayedResult = expectedResult;
  } else {
    // Make it slightly off
    let offset;
    do {
      offset = Math.floor(Math.random() * 5) - 2; // -2 to +2, but not 0
    } while (offset === 0);
    displayedResult = expectedResult + offset;
  }

  // Avoid issues with subtraction like "1 - 5 = -4" being harder if negative numbers not desired
  if (operator === "-" && num1 < num2) {
    // Ensure positive result for simplicity
    operator = "+";
    expectedResult = num1 + num2;
    // Re-evaluate displayedResult if operator changed
    if (isCorrectlyStated) displayedResult = expectedResult;
    else {
      let offset;
      do {
        offset = Math.floor(Math.random() * 5) - 2;
      } while (offset === 0);
      displayedResult = expectedResult + offset;
    }
  }

  return {
    text: `${num1} ${operator} ${num2} = ${displayedResult}`,
    answer: displayedResult === expectedResult,
  };
};

const QUESTIONS_TO_WIN = 3;

const QuickMath: React.FC<QuickMathProps> = ({ onWin }) => {
  const [currentProblem, setCurrentProblem] = useState<Problem>(
    generateProblem()
  );
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleAnswer = (userAnswer: boolean) => {
    if (isGameOver) return;

    if (userAnswer === currentProblem.answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
      if (score + 1 >= QUESTIONS_TO_WIN) {
        setFeedback(
          `Correct! You got ${QUESTIONS_TO_WIN} in a row! Code Revealed!`
        );
        setIsGameOver(true);
        onWin();
      } else {
        // Give feedback then load next problem
        setTimeout(() => {
          setCurrentProblem(generateProblem());
          setFeedback(null);
        }, 1000);
      }
    } else {
      setFeedback("Incorrect! Score reset.");
      setScore(0); // Reset score on wrong answer for more challenge
      setTimeout(() => {
        setCurrentProblem(generateProblem());
        setFeedback(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentProblem(generateProblem());
    setScore(0);
    setFeedback(null);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg blur-md"></div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-md text-center"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <div className="font-silkscreen text-sm text-cyan-300 mb-1">
            SCORE
          </div>
          <div className="text-lg font-silkscreen">
            <span className="text-yellow-400">{score}</span>
            <span className="text-gray-400"> / {QUESTIONS_TO_WIN}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-lg blur-md"></div>
        <div
          className="relative p-6 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg shadow-lg mb-6 w-full text-center"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <p className="font-silkscreen text-3xl text-cyan-300 tracking-wider">
            {currentProblem.text}
          </p>
          <div className="absolute top-2 right-2 w-5 h-5">
            <div className="animate-spin-slow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-cyan-500 opacity-50"
              >
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60"
                  strokeDashoffset="10"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isGameOver ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center gap-4 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(true)}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-700 to-green-600 
                        hover:from-green-600 hover:to-green-500 
                        text-white font-silkscreen rounded-lg shadow-md shadow-green-900/30 
                        transition-transform text-lg border border-green-500/30"
              style={{
                clipPath:
                  "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
              }}
            >
              TRUE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(false)}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-red-700 to-red-600 
                        hover:from-red-600 hover:to-red-500 
                        text-white font-silkscreen rounded-lg shadow-md shadow-red-900/30 
                        transition-transform text-lg border border-red-500/30"
              style={{
                clipPath:
                  "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
              }}
            >
              FALSE
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="play-again"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                      hover:from-blue-500 hover:to-purple-500 
                      text-white font-silkscreen rounded-lg shadow-lg shadow-blue-900/30 
                      transition-all border border-blue-500/30"
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            PLAY AGAIN
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 relative w-full"
          >
            <div
              className={`absolute -inset-1 rounded-lg blur-sm ${
                feedback.includes("Correct")
                  ? "bg-green-500/20"
                  : "bg-red-500/20"
              }`}
            ></div>
            <div
              className={`relative p-3 rounded-md w-full text-center font-silkscreen
                ${
                  feedback.includes("Correct")
                    ? "bg-green-900/40 border border-green-500/40 text-green-300"
                    : "bg-red-900/40 border border-red-500/40 text-red-300"
                }
                ${isGameOver ? "animate-pulse" : ""}`}
              style={{
                clipPath:
                  "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
              }}
            >
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickMath;
