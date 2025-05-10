"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Import game components
import SlidingPuzzle from "@/components/minigames/SlidingPuzzle";
import ClickTheTarget from "@/components/minigames/ClickTheTarget";
import PatternRepeater from "@/components/minigames/PatternRepeater";
import WordScramble from "@/components/minigames/WordScramble";
import QuickMath from "@/components/minigames/QuickMath";

// --- MODIFIABLE CODES ---
const GAME_CODES = {
  slidingPuzzle: "5202kcah",
  clickTheTarget: "nirb",
  patternRepeater: "seiradnuob",
  wordScramble: "dnoyed",
  quickMath: "etavonni",
};
// --- END OF MODIFIABLE CODES ---

type GameKey = keyof typeof GAME_CODES;

export default function Page() {
  const [revealedCodes, setRevealedCodes] = useState<Map<GameKey, string>>(
    new Map()
  );
  const [allCodesRevealed, setAllCodesRevealed] = useState(false);
  const [stars, setStars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);
  const [activeSatellite, setActiveSatellite] = useState<number | null>(null);

  // Function to generate deterministic stars
  const seededRandom = (seed: number) => {
    return ((seed * 9301 + 49297) % 233280) / 233280;
  };

  // Generate stars on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const starArray = Array.from({ length: 100 }, (_, i) => ({
        x: seededRandom(i * 3) * 100,
        y: seededRandom(i * 7) * 100,
        size: seededRandom(i * 13) * 2 + 0.5,
        delay: seededRandom(i * 19) * 3,
      }));
      setStars(starArray);
    }
  }, []);

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

  // Define satellites for each game
  const satelliteImages = [
    "/s1n.png",
    "/s2n.png",
    "/s3n.png",
    "/s4n.png",
    "/s1n.png",
  ];

  const gameSections: {
    id: GameKey;
    title: string;
    component: React.ReactNode;
    description: string;
    satelliteImage: string;
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
      satelliteImage: satelliteImages[0],
    },
    {
      id: "clickTheTarget",
      title: "2. Target Practice",
      description:
        "Click the appearing targets quickly! Hit enough to get your next code.",
      component: (
        <ClickTheTarget onWin={() => handleGameWin("clickTheTarget")} />
      ),
      satelliteImage: satelliteImages[1],
    },
    {
      id: "patternRepeater",
      title: "3. Memory Sequence",
      description:
        "Watch the sequence of lights and repeat it. Success unlocks a code.",
      component: (
        <PatternRepeater onWin={() => handleGameWin("patternRepeater")} />
      ),
      satelliteImage: satelliteImages[2],
    },
    {
      id: "wordScramble",
      title: "4. Word Scramble",
      description: `Unscramble the letters to form a common ${GAME_CODES.wordScramble.length}-letter word.`,
      component: (
        <WordScramble
          targetWord="MILKYWAY-GALAXY"
          onWin={() => handleGameWin("wordScramble")}
        />
      ),
      satelliteImage: satelliteImages[3],
    },
    {
      id: "quickMath",
      title: "5. Math Whiz",
      description:
        "Answer a few simple math questions correctly to prove your genius and get the final code.",
      component: <QuickMath onWin={() => handleGameWin("quickMath")} />,
      satelliteImage: satelliteImages[4],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#05051a] to-[#0a0b25] text-slate-100 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.7,
              animation: `twinkle 3s infinite ${star.delay}s`,
              boxShadow: "0 0 3px #fff, 0 0 5px #fff",
            }}
          />
        ))}
      </div>

      {/* Back Button - moved to top of screen, outside of flex container */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center group hover:scale-105 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <div className="h-8 w-8 md:h-10 md:w-10 relative overflow-hidden rounded-lg hover:shadow-md hover:shadow-blue-900/30 transition-shadow duration-300">
          <Image
            src="/logo.png"
            alt="BrinHack Logo"
            width={40}
            height={40}
            className="object-contain w-full h-full"
          />
        </div>
        <span className="text-white font-major-mono ml-2 text-xs sm:text-sm hidden sm:inline-block">
          <span className="text-[#ff00c0] group-hover:text-pink-500">Brin</span>
          <span className="text-[#26bffd] group-hover:text-blue-500">HAck</span>
        </span>
      </Link>

      <div className="pt-16 md:flex relative z-10">
        {/* Sidebar for Revealed Codes - Fixed positioning, moved lower and more compact */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-60 lg:w-72 p-3 
                  md:fixed md:left-0 md:top-[65%] md:transform md:-translate-y-1/2 md:bottom-auto
                  z-20 bg-slate-900/90 backdrop-blur-sm rounded-r-lg shadow-lg"
          style={{
            borderRight: "1px solid rgba(148, 163, 184, 0.1)",
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 relative">
              <Image
                src="/s3n.png"
                alt="Satellite"
                width={24}
                height={24}
                className="object-contain animate-spin-slow"
              />
            </div>
            <h2 className="font-silkscreen text-sm text-purple-300 border-b border-slate-700 pb-1">
              CODE VAULT
            </h2>
          </div>

          {/* Code list with more compact styling */}
          {gameOrder.length > 0 ? (
            <ul className="space-y-2">
              {gameOrder.map((gameKey, index) => (
                <motion.li
                  key={gameKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="relative"
                >
                  <div
                    className={`relative p-2 bg-slate-800/50 rounded border border-slate-700/50 ${
                      revealedCodes.has(gameKey) ? "border-green-500/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 relative overflow-hidden">
                        <Image
                          src={satelliteImages[index]}
                          alt="Satellite"
                          width={16}
                          height={16}
                          className={`object-contain ${
                            revealedCodes.has(gameKey)
                              ? "animate-spin-slow"
                              : ""
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs ${
                          revealedCodes.has(gameKey)
                            ? "text-cyan-400 font-silkscreen"
                            : "text-slate-400 font-bitwise"
                        }`}
                      >
                        GAME {index + 1}
                      </span>
                    </div>

                    {revealedCodes.has(gameKey) ? (
                      <div className="mt-1 px-2 py-1 bg-slate-900/80 border border-green-500/30 rounded text-center">
                        <div className="text-[10px] text-green-400 font-bitwise">
                          CODE
                        </div>
                        <div className="font-silkscreen text-sm text-lime-400">
                          {revealedCodes.get(gameKey)}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 px-2 py-1 bg-slate-900/50 border border-slate-700 rounded text-center">
                        <div className="font-bitwise text-[10px] text-slate-500">
                          <span className="inline-flex gap-1">
                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                          </span>
                          <span className="ml-1">locked</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-xs">No games configured.</p>
          )}

          {/* Success message when all codes are revealed - more compact */}
          <AnimatePresence>
            {allCodesRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-3 relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur-sm"></div>
                <div className="relative p-2 bg-green-900/40 backdrop-blur-sm rounded border-2 border-green-500/50 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Image
                      src="/pokeball.png"
                      alt="Success"
                      width={16}
                      height={16}
                      className="object-contain animate-spin-slow"
                    />
                    <h3 className="text-sm font-silkscreen text-green-300">
                      COMPLETE!
                    </h3>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://docs.google.com/forms/d/e/your-form-url-here/viewform"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 px-2 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-silkscreen text-xs rounded inline-flex items-center gap-1 hover:from-green-500 hover:to-emerald-500 transition-colors"
                  >
                    <span>NEXT</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer text - smaller */}
          <div className="pt-2 text-center text-[10px] text-slate-500 font-bitwise">
            BrinHack 2025
          </div>
        </motion.aside>

        {/* Main Content Area - Adjust margin to match smaller sidebar */}
        <main className="flex-1 p-4 sm:p-8 relative z-10 md:ml-72">
          {/* Floating satellites on larger screens */}
          <div className="hidden lg:block absolute right-10 top-10 w-16 h-16 z-0">
            <Image
              src="/s1n.png"
              alt="Floating satellite"
              width={64}
              height={64}
              className="object-contain opacity-50 animate-float"
            />
          </div>
          <div className="hidden lg:block absolute left-[10%] top-[40%] w-12 h-12 z-0">
            <Image
              src="/s2n.png"
              alt="Floating satellite"
              width={48}
              height={48}
              className="object-contain opacity-40 animate-float"
              style={{ animationDelay: "1s", animationDuration: "8s" }}
            />
          </div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12 relative"
          >
            <h1 className="text-4xl sm:text-5xl font-silkscreen mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
              MINI-GAME GAUNTLET
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4"
            />
            <p className="text-md text-cyan-200 font-bitwise max-w-2xl mx-auto">
              Complete all challenges to unlock the secret codes. Each game
              reveals a unique piece of data needed for the next phase.
            </p>
          </motion.header>

          {/* Games List */}
          <div className="space-y-10 md:space-y-16 max-w-3xl mx-auto">
            {gameSections.map((game, index) => (
              <motion.section
                key={game.id}
                id={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative"
              >
                {/* Glowing background effect */}
                <div
                  className={`absolute -inset-3 ${
                    revealedCodes.has(game.id)
                      ? "bg-gradient-to-r from-green-600/20 to-cyan-600/20"
                      : "bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"
                  } rounded-lg blur-md`}
                ></div>

                <div
                  className={`relative p-6 lg:p-8 bg-slate-900/70 backdrop-blur-lg rounded-xl overflow-hidden ${
                    revealedCodes.has(game.id)
                      ? "border-2 border-green-500/40"
                      : "border border-slate-700/50"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                  }}
                >
                  {/* Game header with animated satellite */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div
                      className="relative w-16 h-16 flex-shrink-0"
                      onMouseEnter={() => setActiveSatellite(index)}
                      onMouseLeave={() => setActiveSatellite(null)}
                    >
                      <motion.div
                        animate={{
                          scale: activeSatellite === index ? 1.15 : 1,
                          rotate: revealedCodes.has(game.id) ? 360 : 0,
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          rotate: {
                            duration: 8,
                            ease: "linear",
                            repeat: revealedCodes.has(game.id) ? Infinity : 0,
                          },
                        }}
                      >
                        <Image
                          src={game.satelliteImage}
                          alt={`Game ${index + 1} satellite`}
                          width={64}
                          height={64}
                          className={`object-contain ${
                            revealedCodes.has(game.id)
                              ? "drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                              : ""
                          }`}
                        />
                      </motion.div>
                    </div>

                    <div className="flex-grow">
                      <h2 className="text-2xl sm:text-3xl font-silkscreen mb-2 text-sky-400">
                        {game.title}
                      </h2>
                      <p className="text-slate-300 font-bitwise text-sm sm:text-base">
                        {game.description}
                      </p>
                    </div>
                  </div>

                  {/* Game content */}
                  <div
                    className={`${
                      revealedCodes.has(game.id)
                        ? "p-6 border border-green-500/20 bg-slate-800/30"
                        : "pt-6 border-t border-slate-700/50"
                    } rounded-lg`}
                  >
                    {game.component}
                  </div>

                  {/* Revealed code message */}
                  <AnimatePresence>
                    {revealedCodes.has(game.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-5 text-center relative"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg blur-sm"></div>
                        <div className="relative bg-green-900/30 backdrop-blur-sm border border-green-500/40 p-2 rounded-md font-silkscreen text-sm">
                          <span className="text-green-400">
                            CODE ACQUIRED:{" "}
                          </span>
                          <span className="text-lime-300">
                            {GAME_CODES[game.id]}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Bottom padding */}
          <div className="h-12 lg:h-24"></div>
        </main>
      </div>

      {/* Retrowave grid footer */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] z-5 overflow-hidden">
        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 30px, rgba(255, 0, 255, 0.3) 30px, rgba(255, 0, 255, 0.3) 31px)",
            backgroundSize: "100% 100%",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "bottom",
            animation: "grid-move 12s linear infinite",
          }}
        ></div>

        <div
          className="absolute inset-0 z-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent, transparent 30px, rgba(0, 255, 255, 0.3) 30px, rgba(0, 255, 255, 0.3) 31px)",
            backgroundSize: "100% 100%",
            transform: "perspective(600px) rotateX(60deg)",
            transformOrigin: "bottom",
            animation: "grid-move 12s linear infinite",
          }}
        ></div>
      </div>
    </div>
  );
}
