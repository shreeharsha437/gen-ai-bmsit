"use client";
import { useState, useEffect, useRef } from "react";

interface ClickTheTargetProps {
  onWin: () => void;
}

const GRID_SIZE = 4; // 4x4 grid
const TARGETS_TO_WIN = 10;
const TARGET_DURATION_MS = 1200; // How long target stays visible

const ClickTheTarget: React.FC<ClickTheTargetProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState<number | null>(null); // 0 to GRID_SIZE*GRID_SIZE - 1
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnTarget = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    let newPos;
    do {
      newPos = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    } while (newPos === targetPosition); // Ensure new position is different
    setTargetPosition(newPos);

    timerRef.current = setTimeout(() => {
      if (gameActive && !gameOver) {
        // only if game is still running
        setTargetPosition(null); // Target disappears
        spawnTarget(); // Spawn next one
      }
    }, TARGET_DURATION_MS);
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
      setScore((s) => s + 1);
      setTargetPosition(null); // Clicked, remove immediately
      if (timerRef.current) clearTimeout(timerRef.current);
      if (score + 1 < TARGETS_TO_WIN) {
        spawnTarget(); // Spawn next one faster
      }
    }
  };

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    setGameOver(false);
    // spawnTarget will be called by useEffect
  };

  return (
    <div className="flex flex-col items-center">
      {!gameActive && !gameOver && (
        <button
          onClick={startGame}
          className="mb-4 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg text-lg"
        >
          Start Clicking!
        </button>
      )}
      {gameActive && !gameOver && (
        <p className="text-xl mb-4 font-semibold">
          Score: <span className="text-yellow-400">{score}</span> /{" "}
          {TARGETS_TO_WIN}
        </p>
      )}
      {gameOver && (
        <p className="text-xl mb-4 font-bold text-green-400 animate-pulse">
          Targets Hit! Code Revealed!
        </p>
      )}

      <div
        className="grid gap-2 p-2 bg-slate-700 rounded-lg shadow-md"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: "280px",
          height: "280px",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!gameActive || gameOver}
            className={`aspect-square rounded-md transition-all duration-100 ease-in-out
                        ${
                          targetPosition === index
                            ? "bg-red-500 scale-105 ring-2 ring-red-300 animate-pulse"
                            : "bg-slate-600 hover:bg-slate-500"
                        }
                        ${
                          (!gameActive || gameOver) && targetPosition !== index
                            ? "bg-slate-800 opacity-50"
                            : ""
                        }
                        ${
                          gameOver && targetPosition === index
                            ? "bg-green-500"
                            : ""
                        }
                        `}
          />
        ))}
      </div>
      {(gameOver || (!gameActive && score > 0)) && (
        <button
          onClick={startGame}
          className="mt-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default ClickTheTarget;
