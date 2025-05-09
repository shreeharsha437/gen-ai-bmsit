"use client";
import { useState, useEffect } from "react";

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
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <p className="text-lg mb-2">
        Score: <span className="font-bold text-yellow-400">{score}</span> /{" "}
        {QUESTIONS_TO_WIN}
      </p>
      <div className="p-6 bg-slate-700 rounded-lg shadow-inner mb-6 w-full text-center">
        <p className="text-3xl font-mono text-cyan-300">
          {currentProblem.text}
        </p>
      </div>

      {!isGameOver && (
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow text-lg transition-transform hover:scale-105"
          >
            True
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow text-lg transition-transform hover:scale-105"
          >
            False
          </button>
        </div>
      )}

      {feedback && (
        <p
          className={`mt-4 text-md p-3 rounded-md w-full text-center font-semibold
            ${
              feedback.includes("Correct")
                ? "bg-green-700/70 text-green-300"
                : "bg-red-700/70 text-red-300"
            }
            ${isGameOver ? "animate-pulse" : ""}`}
        >
          {feedback}
        </p>
      )}

      {isGameOver && (
        <button
          onClick={resetGame}
          className="mt-6 px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default QuickMath;
