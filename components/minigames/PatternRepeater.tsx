"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PatternRepeaterProps {
  onWin: () => void;
}

const NUM_BUTTONS = 4;
const SEQUENCE_LENGTH = 4; // Initial sequence length
const ROUNDS_TO_WIN = 2;

type GameStatus =
  | "idle"
  | "showing_pattern"
  | "awaiting_input"
  | "won_round"
  | "lost_round"
  | "game_over_win";

const PatternRepeater: React.FC<PatternRepeaterProps> = ({ onWin }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [roundsWon, setRoundsWon] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateSequence = () => {
    const newSequence = Array.from({ length: SEQUENCE_LENGTH }, () =>
      Math.floor(Math.random() * NUM_BUTTONS)
    );
    setSequence(newSequence);
    return newSequence;
  };

  const playSequence = async (seq: number[]) => {
    setStatus("showing_pattern");
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 250)); // Pause before lighting up
      setActiveButton(seq[i]);
      await new Promise((resolve) => setTimeout(resolve, 500)); // How long button stays lit
      setActiveButton(null);
    }
    setStatus("awaiting_input");
    setPlayerInput([]);
  };

  const handleButtonClick = (index: number) => {
    if (status !== "awaiting_input") return;

    const newPlayerInput = [...playerInput, index];
    setPlayerInput(newPlayerInput);
    setActiveButton(index); // Briefly light up player's choice
    setTimeout(() => setActiveButton(null), 200);

    if (
      newPlayerInput[newPlayerInput.length - 1] !==
      sequence[newPlayerInput.length - 1]
    ) {
      setStatus("lost_round");
      return;
    }

    if (newPlayerInput.length === sequence.length) {
      // Correct sequence entered
      if (roundsWon + 1 >= ROUNDS_TO_WIN) {
        setStatus("game_over_win");
        onWin();
      } else {
        setStatus("won_round");
        setRoundsWon((prev) => prev + 1);
      }
    }
  };

  const startNextRound = () => {
    const newSeq = generateSequence();
    playSequence(newSeq);
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerInput([]);
    setActiveButton(null);
    setStatus("idle");
    setRoundsWon(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Enhanced button colors to match space theme with glow effects
  const getButtonColor = (index: number) => {
    const colors = [
      // Red button with glow
      "bg-gradient-to-b from-red-700 to-red-900 border-2 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      // Blue button with glow
      "bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      // Green button with glow
      "bg-gradient-to-b from-green-700 to-green-900 border-2 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]",
      // Purple button with glow
      "bg-gradient-to-b from-purple-700 to-purple-900 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
    ];

    // Active state has increased glow and scale effect
    if (activeButton === index) {
      return `${colors[index]} scale-110 ring-2 ring-white/50 shadow-[0_0_25px_rgba(255,255,255,0.7)]`;
    }

    return `${colors[index]} hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-150`;
  };

  // Create status message with appropriate styling
  const getMessage = () => {
    if (status === "idle") return "🚀 Click Start to Play!";
    if (status === "showing_pattern") return "👀 Watch the sequence...";
    if (status === "awaiting_input") return "🔄 Repeat the pattern!";
    if (status === "won_round") return "✅ Round Complete!";
    if (status === "lost_round") return "❌ Incorrect Pattern!";
    if (status === "game_over_win") return "🎉 Mission Complete!";
    return "Repeat the sequence!";
  };

  // Current progress display
  const getProgressDisplay = () => {
    if (status === "awaiting_input" && playerInput.length > 0) {
      return `${playerInput.length}/${sequence.length}`;
    }
    return `${roundsWon}/${ROUNDS_TO_WIN} rounds`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg blur-md"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative px-6 py-3 bg-slate-900/80 backdrop-blur-sm border border-purple-500/50 rounded-md font-silkscreen text-lg"
          style={{
            clipPath:
              "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
          }}
        >
          <span
            className={`
            ${
              status === "won_round" || status === "game_over_win"
                ? "text-green-400"
                : ""
            }
            ${status === "lost_round" ? "text-red-400" : ""}
            ${status === "idle" ? "text-cyan-400" : ""}
            ${status === "showing_pattern" ? "text-amber-300" : ""}
            ${status === "awaiting_input" ? "text-purple-300" : ""}
            ${status === "game_over_win" ? "animate-pulse" : ""}
          `}
          >
            {getMessage()}
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 px-4 py-2 bg-gray-900/70 border border-cyan-500/30 rounded-md font-silkscreen"
        style={{
          clipPath:
            "polygon(0% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
        }}
      >
        <span className="text-gray-400">Progress: </span>
        <span className="text-cyan-400">{getProgressDisplay()}</span>
      </motion.div>

      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-lg blur-md"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative grid grid-cols-2 gap-3 w-64 h-64 p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg"
          style={{
            clipPath:
              "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
          }}
        >
          {Array.from({ length: NUM_BUTTONS }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleButtonClick(index)}
              disabled={status !== "awaiting_input"}
              whileHover={status === "awaiting_input" ? { scale: 1.03 } : {}}
              whileTap={status === "awaiting_input" ? { scale: 0.97 } : {}}
              className={`rounded-md transition-all duration-150 ease-in-out transform focus:outline-none
                ${getButtonColor(index)}
                ${
                  status !== "awaiting_input"
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
              style={{
                clipPath:
                  "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
              }}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.button
            key="start-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={startNextRound}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-silkscreen rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_20px_rgba(8,145,178,0.6)] transition-all duration-300"
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            START MISSION
          </motion.button>
        )}

        {(status === "won_round" || status === "lost_round") && (
          <motion.button
            key="next-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={status === "won_round" ? startNextRound : resetGame}
            className={`mt-8 px-8 py-3 font-silkscreen rounded-lg shadow-lg transition-all duration-300
              ${
                status === "won_round"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              }`}
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            {status === "won_round" ? "NEXT ROUND" : "TRY AGAIN"}
          </motion.button>
        )}

        {status === "game_over_win" && (
          <motion.button
            key="play-again-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={resetGame}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-silkscreen rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300"
            style={{
              clipPath:
                "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            }}
          >
            PLAY AGAIN
          </motion.button>
        )}
      </AnimatePresence>

      {/* Optional hint */}
      {status === "awaiting_input" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4 text-sm text-cyan-300 font-bitwise text-center max-w-xs"
        >
          Click the buttons in the same order they were highlighted
        </motion.p>
      )}
    </div>
  );
};

export default PatternRepeater;
