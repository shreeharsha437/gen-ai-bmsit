"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const DEFAULT_SIZE = 300;

interface Tile {
  id: number; // Stable ID for the piece (1-9)
  currentPosition: number; // Current position in the grid (0-8)
  correctPosition: number; // Correct position in the grid (0-8)
  isLocked: boolean; // Whether this tile is in the correct position and locked
  x: number; // For animation coordinates
  y: number; // For animation coordinates
}

interface SlidingPuzzleProps {
  onSolve: () => void;
  imageUrl: string;
}

// Fisher-Yates shuffle for positions
const shufflePositions = (count: number): number[] => {
  const positions = Array.from({ length: count }, (_, i) => i);

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions;
};

// Ensure the puzzle is sufficiently scrambled
// We want NO pieces in their correct position at start
const isWellScrambled = (positions: number[]): boolean => {
  // Count how many pieces are in their correct position
  const correctPositions = positions.filter((pos, idx) => pos === idx).length;

  // We want NO pieces in their correct position at start
  return correctPositions === 0;
};

// Generate a well-scrambled puzzle with no pieces in correct positions
const generateScrambledPuzzle = (): Tile[] => {
  let shuffledPositions: number[] = [];

  // Keep shuffling until we get a state with NO pieces in correct position
  do {
    shuffledPositions = shufflePositions(TOTAL_TILES);
  } while (!isWellScrambled(shuffledPositions));

  // Create tiles with the shuffled positions
  return Array.from({ length: TOTAL_TILES }, (_, i) => {
    const currentPos = shuffledPositions[i];
    const row = Math.floor(currentPos / GRID_SIZE);
    const col = currentPos % GRID_SIZE;

    return {
      id: i + 1, // Tile IDs are 1-9
      currentPosition: currentPos,
      correctPosition: i,
      isLocked: false, // No tiles are locked initially
      x: col * (DEFAULT_SIZE / GRID_SIZE), // For animation
      y: row * (DEFAULT_SIZE / GRID_SIZE), // For animation
    };
  });
};

const SlidingPuzzle: React.FC<SlidingPuzzleProps> = ({ onSolve, imageUrl }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);
  const [secondSelectedTileId, setSecondSelectedTileId] = useState<
    number | null
  >(null);
  const [isSolved, setIsSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moves, setMoves] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Use refs for measurements
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize the puzzle after image is loaded
  useEffect(() => {
    if (imageLoaded) {
      const initialTiles = generateScrambledPuzzle();
      setTiles(initialTiles);
      setIsLoading(false);
    }
  }, [imageLoaded]);

  // Update positions for animation
  const updateTilePositions = useCallback(() => {
    setTiles((currentTiles) =>
      currentTiles.map((tile) => {
        const row = Math.floor(tile.currentPosition / GRID_SIZE);
        const col = tile.currentPosition % GRID_SIZE;
        return {
          ...tile,
          x: col * (DEFAULT_SIZE / GRID_SIZE),
          y: row * (DEFAULT_SIZE / GRID_SIZE),
        };
      })
    );
  }, []);

  // Check if the puzzle is solved
  const checkSolved = useCallback(() => {
    if (tiles.length === 0) return false;

    const solved = tiles.every(
      (tile) => tile.currentPosition === tile.correctPosition
    );

    if (solved && !isSolved) {
      setIsSolved(true);
      setTimeout(() => onSolve(), 500); // Delay to show completion animation
    }

    return solved;
  }, [tiles, isSolved, onSolve]);

  // Update locked status and check for solved state
  useEffect(() => {
    if (tiles.length === 0 || isSwapping) return;

    const updatedTiles = tiles.map((tile) => ({
      ...tile,
      isLocked: tile.currentPosition === tile.correctPosition,
    }));

    setTiles(updatedTiles);
    updateTilePositions();
    checkSolved();
  }, [tiles, checkSolved, isSwapping, updateTilePositions]);

  // Process swap when both tiles are selected
  useEffect(() => {
    if (
      selectedTileId !== null &&
      secondSelectedTileId !== null &&
      !isSwapping
    ) {
      const firstTile = tiles.find((t) => t.id === selectedTileId);
      const secondTile = tiles.find((t) => t.id === secondSelectedTileId);

      if (firstTile && secondTile) {
        setIsSwapping(true);

        // Create new tiles array with swapped positions
        const newTiles = tiles.map((tile) => {
          if (tile.id === firstTile.id) {
            return {
              ...tile,
              currentPosition: secondTile.currentPosition,
            };
          } else if (tile.id === secondTile.id) {
            return {
              ...tile,
              currentPosition: firstTile.currentPosition,
            };
          }
          return tile;
        });

        setTiles(newTiles);
        setMoves((moves) => moves + 1);

        // Reset selections and allow animation to complete
        setTimeout(() => {
          setSelectedTileId(null);
          setSecondSelectedTileId(null);
          setIsSwapping(false);
        }, 350);
      }
    }
  }, [selectedTileId, secondSelectedTileId, isSwapping, tiles]);

  // Handle tile click for selection
  const handleTileClick = (clickedTileId: number) => {
    if (isSolved || isSwapping) return;

    // Find the clicked tile
    const clickedTile = tiles.find((t) => t.id === clickedTileId);
    if (!clickedTile) return;

    // If this tile is already selected, deselect it
    if (clickedTileId === selectedTileId) {
      setSelectedTileId(null);
      return;
    }

    // If we don't have a first selection yet, make this the first selection
    if (selectedTileId === null) {
      setSelectedTileId(clickedTileId);
      return;
    }

    // Otherwise, this is our second selection
    setSecondSelectedTileId(clickedTileId);
  };

  const resetGame = () => {
    setIsLoading(true);
    setSelectedTileId(null);
    setSecondSelectedTileId(null);
    setIsSolved(false);
    setMoves(0);
    setIsSwapping(false);

    // Short delay to show loading animation
    setTimeout(() => {
      const newTiles = generateScrambledPuzzle();
      setTiles(newTiles);
      setIsLoading(false);
    }, 500);
  };

  // Get style for a tile based on its original/correct position
  const getTileStyle = (tile: Tile) => {
    const tileWidth = DEFAULT_SIZE / GRID_SIZE;
    const tileHeight = DEFAULT_SIZE / GRID_SIZE;
    const row = Math.floor(tile.correctPosition / GRID_SIZE);
    const col = tile.correctPosition % GRID_SIZE;

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${DEFAULT_SIZE}px ${DEFAULT_SIZE}px`,
      backgroundPosition: `-${col * tileWidth}px -${row * tileHeight}px`,
    };
  };

  // Calculate display size for tiles
  const TILE_SIZE = DEFAULT_SIZE / GRID_SIZE - 4; // 4px for gap

  return (
    <div className="flex flex-col items-center">
      {/* Hidden image to preload */}
      <div className="hidden">
        <Image
          src={imageUrl}
          alt="Puzzle image preload"
          width={300}
          height={300}
          priority
          onLoadingComplete={() => setImageLoaded(true)}
          onError={() => {
            console.error("Failed to load puzzle image");
            setIsLoading(false);
          }}
        />
      </div>

      {/* Status indicator */}
      <div className="mb-4 font-silkscreen">
        {isSolved ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-lg animate-pulse px-4 py-2 bg-slate-800/50 rounded-md border border-green-500/30"
          >
            QR Code Reconstructed!
          </motion.div>
        ) : (
          <div className="text-cyan-400 text-sm">
            Moves: <span className="font-bold">{moves}</span> •
            <span className="ml-2">
              Correct:{" "}
              <span className="font-bold">
                {tiles.filter((t) => t.isLocked).length}
              </span>
              /{TOTAL_TILES}
            </span>
          </div>
        )}
      </div>

      {/* Game board */}
      {isLoading || !imageLoaded ? (
        <div className="flex items-center justify-center w-[300px] h-[300px] bg-slate-800/50 rounded-lg">
          <div className="w-10 h-10 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative p-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg"
          style={{
            width: DEFAULT_SIZE,
            height: DEFAULT_SIZE,
          }}
        >
          {tiles.map((tile) => {
            const isSelected =
              tile.id === selectedTileId || tile.id === secondSelectedTileId;

            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0.8, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 1.05 : 1,
                  filter: tile.isLocked
                    ? "grayscale(0.5) brightness(0.8)"
                    : "grayscale(0)",
                  x: tile.x,
                  y: tile.y,
                  zIndex: isSelected ? 10 : 1,
                  boxShadow: isSelected
                    ? "0 0 15px rgba(168, 85, 247, 0.5)"
                    : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  x: { duration: 0.3 },
                  y: { duration: 0.3 },
                }}
                onClick={() => handleTileClick(tile.id)}
                className={`
                  absolute aspect-square flex items-center justify-center
                  border-2 transition-colors duration-150 rounded-md
                  ${
                    tile.isLocked
                      ? "border-green-500/50"
                      : isSelected
                      ? "border-purple-500/70 cursor-pointer"
                      : "border-slate-600/70 hover:border-blue-400/50 cursor-pointer"
                  }
                `}
                style={{
                  ...getTileStyle(tile),
                  width: `${TILE_SIZE}px`,
                  height: `${TILE_SIZE}px`,
                }}
              >
                {/* Overlay effect for locked tiles */}
                {tile.isLocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] rounded-sm flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-sm flex items-center justify-center
                      ${
                        tile.id === selectedTileId
                          ? "bg-purple-500/10"
                          : "bg-blue-500/10"
                      }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full animate-pulse
                        ${
                          tile.id === selectedTileId
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                    ></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Instruction text */}
      {!isSolved && !isLoading && imageLoaded && (
        <div className="mt-3 text-xs text-cyan-300/70 text-center max-w-[300px] bg-slate-800/30 rounded-md p-2 font-bitwise">
          Click two tiles to swap them. When a piece is in the correct position,
          it will lock in place.
        </div>
      )}

      {/* Reset button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-silkscreen text-sm rounded-lg shadow transition-colors"
        style={{
          clipPath:
            "polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
        }}
      >
        {isSolved ? "Play Again" : "Reset Puzzle"}
      </motion.button>
    </div>
  );
};

export default SlidingPuzzle;
