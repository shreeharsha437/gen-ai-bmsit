"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion"; // For code reveal animation

// Import game components
import SlidingPuzzle from "@/components/minigames/SlidingPuzzle";
import ClickTheTarget from "@/components/minigames/ClickTheTarget";
import PatternRepeater from "@/components/minigames/PatternRepeater";
import WordScramble from "@/components/minigames/WordScramble";
import QuickMath from "@/components/minigames/QuickMath";

// --- MODIFIABLE CODES ---
const GAME_CODES = {
  slidingPuzzle: "SOMETHING",
  clickTheTarget: "RANDOM",
  patternRepeater: "TO BE KEPT",
  wordScramble: "BY", // Word scramble game will reveal "BY"
  quickMath: "KNIFE", // Quick math game will reveal "KNIFE"
};
// --- END OF MODIFIABLE CODES ---

type GameKey = keyof typeof GAME_CODES;

export default function MiniGamesPage() {
  const [revealedCodes, setRevealedCodes] = useState<Map<GameKey, string>>(
    new Map()
  );
  const [allCodesRevealed, setAllCodesRevealed] = useState(false);

  const handleGameWin = (gameKey: GameKey) => {
    const code = GAME_CODES[gameKey];
    setRevealedCodes((prev) => {
      const newMap = new Map(prev);
      newMap.set(gameKey, code);
      return newMap;
    });
  };

  useEffect(() => {
    if (revealedCodes.size === Object.keys(GAME_CODES).length) {
      setAllCodesRevealed(true);
    }
  }, [revealedCodes]);

  const gameOrder: GameKey[] = [
    "slidingPuzzle",
    "clickTheTarget",
    "patternRepeater",
    "wordScramble",
    "quickMath",
  ];

  const gameSections: {
    id: GameKey;
    title: string;
    component: JSX.Element;
    description: string;
  }[] = [
    {
      id: "slidingPuzzle",
      title: "1. Jumbled QR Puzzle",
      description:
        "Reassemble the image pieces by sliding them. Solving it reveals the first code.",
      component: (
        <SlidingPuzzle
          onSolve={() => handleGameWin("slidingPuzzle")}
          imageUrl="/qr-code-solved.png"
        />
      ),
    },
    {
      id: "clickTheTarget",
      title: "2. Target Practice",
      description:
        "Click the appearing targets quickly! Hit enough to get your next code.",
      component: (
        <ClickTheTarget onWin={() => handleGameWin("clickTheTarget")} />
      ),
    },
    {
      id: "patternRepeater",
      title: "3. Memory Sequence",
      description:
        "Watch the sequence of lights and repeat it. Success unlocks a code.",
      component: (
        <PatternRepeater onWin={() => handleGameWin("patternRepeater")} />
      ),
    },
    {
      id: "wordScramble",
      title: "4. Word Scramble",
      description: `Unscramble the letters to form a common ${GAME_CODES.wordScramble.length}-letter word. The code itself is "${GAME_CODES.wordScramble}".`,
      component: (
        <WordScramble
          targetWord="HACK"
          onWin={() => handleGameWin("wordScramble")}
        />
      ),
      // Note: The target word "HACK" is internal to the game. Winning reveals the code "BY".
      // You can change "HACK" to any word, but the description should match its length.
    },
    {
      id: "quickMath",
      title: "5. Math Whiz",
      description:
        "Answer a few simple math questions correctly to prove your genius and get the final code.",
      component: <QuickMath onWin={() => handleGameWin("quickMath")} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Mini Games Challenge</title>
        <meta
          name="description"
          content="Solve 5 mini games to get the codes!"
        />
      </Head>
      <div className="min-h-screen bg-slate-900 text-slate-100 md:flex">
        {/* Sidebar for Revealed Codes */}
        <aside className="md:w-72 lg:w-80 p-4 md:p-6 bg-slate-800 md:h-screen md:sticky md:top-0 shadow-lg z-10">
          <h2 className="text-2xl font-bold mb-6 text-sky-400 border-b border-slate-700 pb-3">
            Revealed Codes
          </h2>
          {gameOrder.length > 0 ? (
            <ul className="space-y-3">
              {gameOrder.map((gameKey, index) => (
                <li
                  key={gameKey}
                  className="p-3 bg-slate-700/50 rounded-lg shadow"
                >
                  <span className="text-sm text-slate-400 block">
                    Game {index + 1}:
                  </span>
                  <AnimatePresence>
                    {revealedCodes.has(gameKey) ? (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-lime-400 font-mono text-xl block"
                      >
                        {revealedCodes.get(gameKey)}
                      </motion.span>
                    ) : (
                      <span className="text-slate-500 italic block">
                        Not revealed yet
                      </span>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No games configured.</p>
          )}
          {allCodesRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center p-4 bg-green-800/70 rounded-lg"
            >
              <p className="text-xl font-bold text-green-300">
                🎉 All Codes Collected! 🎉
              </p>
              <p className="text-sm text-green-400 mt-1">
                Proceed to the Google Form.
              </p>
            </motion.div>
          )}
          <div className="mt-auto pt-6 text-center text-xs text-slate-500 md:absolute md:bottom-4 md:left-0 md:right-0">
            Hackathon Project
          </div>
        </aside>

        {/* Main Content Area for Games */}
        <main className="flex-1 p-4 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800">
          <header className="text-center mb-10 md:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              The Mini-Game Gauntlet
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Conquer these mini-games to unlock secret codes. Speed and smarts
              are your allies!
            </p>
          </header>

          <div className="space-y-10 md:space-y-12 max-w-3xl mx-auto">
            {gameSections.map((game) => (
              <motion.section
                key={game.id}
                id={game.id}
                className="p-6 bg-slate-800/60 rounded-xl shadow-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-sky-400">
                  {game.title}
                </h2>
                <p className="text-slate-300 mb-6 text-sm sm:text-base">
                  {game.description}
                </p>
                <div className="border-t border-slate-700 pt-6">
                  {game.component}
                </div>
                {revealedCodes.has(game.id) && (
                  <p className="mt-5 text-center text-green-400 font-bold text-sm bg-green-900/50 p-2 rounded-md">
                    Code for this game revealed: {GAME_CODES[game.id]}
                  </p>
                )}
              </motion.section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
