"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickTheTargetProps {
  onWin: () => void;
}

const GRID_SIZE = 4; // 4x4 grid
const TARGETS_TO_WIN = 10;
const INITIAL_TARGET_DURATION_MS = 1000; // Starting duration
const MIN_TARGET_DURATION_MS = 600; // Minimum duration
const DURATION_DECREASE_PER_TARGET = 90; // Decrease by this much for each hit

const ClickTheTarget: React.FC<ClickTheTargetProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(
    INITIAL_TARGET_DURATION_MS
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Icons for targets
  const targetIcons = ["⚡️", "⭐", "🔷", "💫", "✨"];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const spawnTarget = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Select a new position
    let newPos;
    do {
      newPos = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    } while (newPos === targetPosition);
    setTargetPosition(newPos);

    // Randomly change the icon
    setCurrentIconIndex(Math.floor(Math.random() * targetIcons.length));

    // Set timer to make target disappear
    timerRef.current = setTimeout(() => {
      if (gameActive && !gameOver) {
        setTargetPosition(null);
        spawnTarget(); // Spawn next one
      }
    }, currentDuration);
  };

  useEffect(() => {
    if (gameActive && !gameOver) {
      spawnTarget();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive, gameOver]);

  useEffect(() => {
    if (score >= TARGETS_TO_WIN) {
      setGameActive(false);
      setGameOver(true);
      setTargetPosition(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      onWin();
    }
  }, [score, onWin]);

  const handleCellClick = (index: number) => {
    if (!gameActive || gameOver) return;
    if (index === targetPosition) {
      // Update score
      setScore((s) => s + 1);

      // Decrease duration for increasing difficulty
      const newDuration = Math.max(
        MIN_TARGET_DURATION_MS,
        currentDuration - DURATION_DECREASE_PER_TARGET
      );
      setCurrentDuration(newDuration);

      // Clear current target
      setTargetPosition(null);
      if (timerRef.current) clearTimeout(timerRef.current);

      // Spawn next target if not game over
      if (score + 1 < TARGETS_TO_WIN) {
        spawnTarget();
      }
    }
  };

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    setGameOver(false);
    setCurrentDuration(INITIAL_TARGET_DURATION_MS);
  };

  const stopGame = () => {
    setGameActive(false);
    setTargetPosition(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm mb-4">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg blur-sm"></div>
        <div
          className="relative flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-md"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <div className="font-silkscreen text-cyan-300">
            {gameActive ? (
              <>
                <span className="text-yellow-400 text-xl">{score}</span>
                <span className="text-gray-400 text-sm">
                  {" "}
                  / {TARGETS_TO_WIN}
                </span>
              </>
            ) : gameOver ? (
              <span className="text-green-400">COMPLETE!</span>
            ) : (
              <span>TARGET PRACTICE</span>
            )}
          </div>
          <div className="flex space-x-2">
            {!gameActive && !gameOver && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-4 py-1 bg-gradient-to-r from-green-700 to-green-600 
                          hover:from-green-600 hover:to-green-500 text-white 
                          font-silkscreen text-xs rounded border border-green-500/30 shadow-md"
                style={{
                  clipPath:
                    "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                }}
              >
                START
              </motion.button>
            )}
            {gameActive && !gameOver && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopGame}
                className="px-4 py-1 bg-gradient-to-r from-red-700 to-red-600 
                          hover:from-red-600 hover:to-red-500 text-white 
                          font-silkscreen text-xs rounded border border-red-500/30 shadow-md"
                style={{
                  clipPath:
                    "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                }}
              >
                STOP
              </motion.button>
            )}
            {(gameOver || (!gameActive && score > 0)) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-4 py-1 bg-gradient-to-r from-blue-700 to-purple-600 
                          hover:from-blue-600 hover:to-purple-500 text-white 
                          font-silkscreen text-xs rounded border border-blue-500/30 shadow-md"
                style={{
                  clipPath:
                    "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                }}
              >
                RETRY
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-green-400 text-lg animate-pulse px-4 py-2 bg-slate-800/50 rounded-md border border-green-500/30 font-silkscreen"
        >
          Targets Hit! Code Revealed!
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-lg blur-md"></div>
        <div
          className="relative grid gap-2 p-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700/50"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: "280px",
            height: "280px",
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!gameActive || gameOver}
              whileHover={gameActive && !gameOver ? { scale: 1.05 } : {}}
              whileTap={gameActive && !gameOver ? { scale: 0.95 } : {}}
              className={`aspect-square rounded-md transition-all duration-150 ease-in-out 
                          font-silkscreen text-lg 
                          ${
                            targetPosition === index && gameActive
                              ? "bg-gradient-to-br from-purple-700/80 to-pink-600/80 ring-2 ring-cyan-400/80 shadow-lg shadow-cyan-500/30"
                              : "bg-slate-700/70 border border-slate-600/50"
                          }
                          ${
                            (!gameActive || gameOver) &&
                            targetPosition !== index
                              ? "bg-slate-800/50 opacity-50"
                              : ""
                          }
                          ${
                            gameOver && targetPosition === index
                              ? "bg-gradient-to-br from-green-700 to-green-600 ring-2 ring-green-400"
                              : ""
                          }
                          `}
              style={
                targetPosition === index
                  ? {
                      boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)",
                    }
                  : {}
              }
            >
              {targetPosition === index && (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIconIndex}
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    className="inline-block text-2xl"
                  >
                    {targetIcons[currentIconIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="mt-4 text-xs text-cyan-300/70 text-center max-w-[280px] bg-slate-800/30 rounded-md p-2 font-bitwise">
        {gameActive ? (
          <span>
            Click the targets before they vanish!
            <br />
            <span className="text-yellow-400/70">
              Speed increases with each hit!
            </span>
          </span>
        ) : gameOver ? (
          <span className="text-green-400/80">
            Great job! You've completed the challenge.
          </span>
        ) : (
          <span>Click START to begin the target practice challenge.</span>
        )}
      </div>
    </div>
  );
};

export default ClickTheTarget;
