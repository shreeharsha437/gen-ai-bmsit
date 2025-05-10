"use client";
import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordScrambleProps {
  onWin: () => void;
  targetWord?: string;
}

// Enhanced shuffle algorithm to ensure more randomized results
const shuffleWord = (word: string): string => {
  const arr = word.split("");

  // Count how many characters would remain in their original position
  let originalPositionCount = 0;
  const maxAttempts = 10; // Prevent infinite loops
  let attempts = 0;
  let shuffledArr: string[];

  do {
    shuffledArr = [...arr];
    originalPositionCount = 0;

    // Fisher-Yates shuffle with extra randomization
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      // Use multiple random positions for better shuffling
      const j = Math.floor(Math.random() * i);
      const k = Math.floor(Math.random() * i);

      // Swap characters
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];

      // Additional swap for more randomness
      if (i > 2 && Math.random() > 0.5) {
        [shuffledArr[i - 1], shuffledArr[k]] = [
          shuffledArr[k],
          shuffledArr[i - 1],
        ];
      }
    }

    // Count characters in original positions
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === shuffledArr[i]) {
        originalPositionCount++;
      }
    }

    attempts++;
  } while (
    originalPositionCount > Math.min(3, Math.floor(arr.length * 0.2)) &&
    attempts < maxAttempts
  );

  return shuffledArr.join("");
};

const WordScramble: React.FC<WordScrambleProps> = ({
  onWin,
  targetWord = "MILKYWAY-GALAXY",
}) => {
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isWon, setIsWon] = useState(false);
  const [hint, setHint] = useState(false);
  const [showHintText, setShowHintText] = useState(false);

  // Initialize with shuffled word
  useEffect(() => {
    setScrambledWord(shuffleWord(targetWord.toUpperCase()));
  }, [targetWord]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isWon) return;

    if (guess.toUpperCase() === targetWord.toUpperCase()) {
      setMessage(
        `Correct! You've decoded "${targetWord.toUpperCase()}". Code Revealed!`
      );
      setIsWon(true);
      onWin();
    } else {
      setMessage("Incorrect decryption sequence. Try again!");
      setGuess("");
    }
  };

  const resetGame = () => {
    setScrambledWord(shuffleWord(targetWord.toUpperCase()));
    setGuess("");
    setMessage("");
    setIsWon(false);
    setHint(false);
    setShowHintText(false);
  };

  const showHint = () => {
    setHint(true);
    setTimeout(() => {
      setShowHintText(true);
    }, 500);
  };

  // Split scrambled word into letters for animation
  const letters = scrambledWord.split("");

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg blur-md"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-md text-center"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <div className="font-silkscreen text-sm text-cyan-300 mb-1">
            COSMIC DECODER
          </div>
          <div className="flex flex-wrap justify-center gap-2 py-3">
            {letters.map((letter, index) => (
              <motion.div
                key={`${index}-${letter}`}
                initial={{ opacity: 0, y: -20, rotateY: 180 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateY: 0,
                  transition: {
                    delay: index * 0.05,
                    duration: 0.4,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: Math.random() > 0.5 ? 5 : -5,
                  transition: { duration: 0.2 },
                }}
                className={`
                  ${letter === "-" ? "w-4" : "w-9"}
                  h-10 flex items-center justify-center
                  ${
                    letter === "-"
                      ? "bg-purple-900/30"
                      : "bg-gradient-to-b from-blue-900/80 to-indigo-900/80"
                  }
                  border ${
                    letter === "-"
                      ? "border-purple-500/30"
                      : "border-cyan-500/50"
                  }
                  text-xl font-silkscreen text-cyan-300 shadow-md
                  rounded-md
                `}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="w-full relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-sm"></div>
        <div
          className="relative p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder={`Decrypt the code (${targetWord.length} chars)`}
              disabled={isWon}
              className="flex-grow p-2 border border-cyan-900/50 rounded-md 
              bg-slate-800/80 text-cyan-300 font-bitwise tracking-wider
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none 
              uppercase placeholder-slate-500 text-sm"
              maxLength={targetWord.length}
            />
            <motion.button
              type="submit"
              disabled={isWon || !guess}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 font-silkscreen text-xs whitespace-nowrap
              ${
                isWon
                  ? "bg-green-700/50 text-green-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white"
              }
              rounded-md shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed
              border border-indigo-500/30`}
              style={{
                clipPath:
                  "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
              }}
            >
              DECRYPT
            </motion.button>
          </div>

          <div className="flex justify-between mt-3">
            <motion.button
              type="button"
              onClick={showHint}
              disabled={hint || isWon}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-cyan-500 hover:text-cyan-400 font-silkscreen 
                        disabled:text-slate-600 disabled:cursor-not-allowed"
            >
              {hint ? "HINT USED" : "REQUEST HINT"}
            </motion.button>

            <motion.button
              type="button"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-amber-500 hover:text-amber-400 font-silkscreen"
            >
              NEW SCRAMBLE
            </motion.button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-3 relative"
          >
            <div className="absolute -inset-1 bg-cyan-600/10 rounded-lg blur-sm"></div>
            <div className="relative p-3 bg-slate-900/80 border border-cyan-900/30 rounded-md">
              <div className="text-xs font-silkscreen text-cyan-400 mb-1">
                HINT:
              </div>
              <AnimatePresence>
                {showHintText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-cyan-300/80 font-bitwise"
                  >
                    It's our home galaxy in the cosmic void.
                  </motion.div>
                )}
              </AnimatePresence>
              {!showHintText && (
                <div className="h-4 w-full bg-slate-800 rounded animate-pulse"></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-full relative"
          >
            <div
              className={`absolute -inset-1 rounded-lg blur-sm 
                           ${isWon ? "bg-green-500/20" : "bg-red-500/20"}`}
            ></div>
            <div
              className={`relative p-3 rounded-md w-full text-center font-silkscreen
                ${
                  isWon
                    ? "bg-green-900/40 border border-green-500/40 text-green-300"
                    : "bg-red-900/40 border border-red-500/40 text-red-300"
                }
                ${isWon ? "animate-pulse" : ""}`}
              style={{
                clipPath:
                  "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
              }}
            >
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWon && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                      hover:from-blue-500 hover:to-purple-500 text-white font-silkscreen 
                      rounded-md shadow-lg border border-blue-500/30"
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            PLAY AGAIN
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordScramble;
