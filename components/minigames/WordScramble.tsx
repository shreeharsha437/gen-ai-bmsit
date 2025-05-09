"use client";
import { useState, useEffect, FormEvent } from "react";

interface WordScrambleProps {
  onWin: () => void;
  targetWord: string; // e.g., "HACK"
}

const shuffleWord = (word: string): string => {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join("") === word && word.length > 1) return shuffleWord(word); // Reshuffle if it's the same
  return arr.join("");
};

const WordScramble: React.FC<WordScrambleProps> = ({ onWin, targetWord }) => {
  const [scrambledWord, setScrambledWord] = useState(
    shuffleWord(targetWord.toUpperCase())
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isWon, setIsWon] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isWon) return;

    if (guess.toUpperCase() === targetWord.toUpperCase()) {
      setMessage(
        `Correct! The word was ${targetWord.toUpperCase()}. Code Revealed!`
      );
      setIsWon(true);
      onWin();
    } else {
      setMessage("Incorrect. Try again!");
      setGuess("");
    }
  };

  const resetGame = () => {
    setScrambledWord(shuffleWord(targetWord.toUpperCase()));
    setGuess("");
    setMessage("");
    setIsWon(false);
  };

  useEffect(() => {
    // Ensure new scramble on prop change, though unlikely here
    setScrambledWord(shuffleWord(targetWord.toUpperCase()));
  }, [targetWord]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <p className="text-4xl font-bold tracking-widest text-yellow-400 mb-6 p-3 bg-slate-700 rounded-lg shadow-inner">
        {scrambledWord}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-4 w-full"
      >
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={`Unscramble (${targetWord.length} letters)`}
          disabled={isWon}
          className="flex-grow p-3 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none uppercase placeholder-slate-400"
          maxLength={targetWord.length}
        />
        <button
          type="submit"
          disabled={isWon}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
      {message && (
        <p
          className={`text-lg p-3 rounded-md w-full text-center ${
            isWon
              ? "bg-green-700/70 text-green-300 animate-pulse"
              : "bg-red-700/70 text-red-300"
          }`}
        >
          {message}
        </p>
      )}
      {isWon && (
        <button
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default WordScramble;
