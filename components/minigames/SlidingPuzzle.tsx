"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 3;
const EMPTY_VALUE = 0; // Represents the empty space, ensure it's not a piece ID

interface Tile {
  id: number; // Stable ID for the piece (1-8), or unique ID for empty tile
  value: number; // The visual number/identifier (1-8 for pieces, EMPTY_VALUE for empty)
  originalOrder: number; // For bg image slicing (0-7 for pieces)
}

interface SlidingPuzzleProps {
  onSolve: () => void;
  imageUrl: string;
}

// Fisher-Yates shuffle for Tile objects based on their 'id'
const shuffleTiles = (array: Tile[]): Tile[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const countInversions = (arr: Tile[]): number => {
  let inversions = 0;
  const numericValues = arr
    .map((t) => t.value)
    .filter((v) => v !== EMPTY_VALUE);
  for (let i = 0; i < numericValues.length - 1; i++) {
    for (let j = i + 1; j < numericValues.length; j++) {
      if (numericValues[i] > numericValues[j]) {
        inversions++;
      }
    }
  }
  return inversions;
};

const generateSolvablePuzzle = (): Tile[] => {
  let puzzleTiles: Tile[];
  const initialPieces: Tile[] = Array.from(
    { length: GRID_SIZE * GRID_SIZE - 1 },
    (_, i) => ({
      id: i + 1, // Piece ID 1-8
      value: i + 1,
      originalOrder: i,
    })
  );
  const emptyTile: Tile = {
    id: GRID_SIZE * GRID_SIZE,
    value: EMPTY_VALUE,
    originalOrder: -1,
  }; // Unique ID for empty

  do {
    const shuffledPieces = shuffleTiles([...initialPieces]);
    // Place empty tile randomly or at the end for shuffling
    const emptyPos = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    puzzleTiles = [...shuffledPieces];
    puzzleTiles.splice(emptyPos, 0, emptyTile);
  } while (countInversions(puzzleTiles) % 2 !== 0 && GRID_SIZE % 2 !== 0); // Simplified solvability for odd grid; for even grid, row of empty matters.
  // For 3x3 (odd grid), inversion count must be even.

  return puzzleTiles;
};

const SlidingPuzzle: React.FC<SlidingPuzzleProps> = ({ onSolve, imageUrl }) => {
  const createSolvedState = (): Tile[] => {
    const tiles: Tile[] = Array.from(
      { length: GRID_SIZE * GRID_SIZE - 1 },
      (_, i) => ({
        id: i + 1,
        value: i + 1,
        originalOrder: i,
      })
    );
    tiles.push({
      id: GRID_SIZE * GRID_SIZE,
      value: EMPTY_VALUE,
      originalOrder: -1,
    });
    return tiles;
  };

  const [tiles, setTiles] = useState<Tile[]>(generateSolvablePuzzle());
  const [isSolved, setIsSolved] = useState(false);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgDimensions({ width: img.width, height: img.height });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const checkSolved = useCallback((currentTiles: Tile[]) => {
    const solvedStatePattern = createSolvedState();
    for (let i = 0; i < solvedStatePattern.length; i++) {
      if (currentTiles[i].value !== solvedStatePattern[i].value) return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (checkSolved(tiles)) {
      setIsSolved(true);
      onSolve();
    } else {
      setIsSolved(false);
    }
  }, [tiles, onSolve, checkSolved]);

  const handleTileClick = (clickedTileId: number) => {
    if (isSolved) return;

    const clickedIndex = tiles.findIndex((t) => t.id === clickedTileId);
    const emptyIndex = tiles.findIndex((t) => t.value === EMPTY_VALUE);

    if (clickedIndex === -1 || emptyIndex === -1) return; // Should not happen

    const { row: clickedRow, col: clickedCol } = {
      row: Math.floor(clickedIndex / GRID_SIZE),
      col: clickedIndex % GRID_SIZE,
    };
    const { row: emptyRow, col: emptyCol } = {
      row: Math.floor(emptyIndex / GRID_SIZE),
      col: emptyIndex % GRID_SIZE,
    };

    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[clickedIndex], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[clickedIndex],
      ];
      setTiles(newTiles);
    }
  };

  const resetGame = () => {
    setTiles(generateSolvablePuzzle());
    setIsSolved(false);
  };

  const getTileStyle = (tile: Tile) => {
    if (
      tile.value === EMPTY_VALUE ||
      !imgDimensions.width ||
      !imgDimensions.height
    ) {
      return { background: "transparent" };
    }
    const tileWidth = imgDimensions.width / GRID_SIZE;
    const tileHeight = imgDimensions.height / GRID_SIZE;
    const x = (tile.originalOrder % GRID_SIZE) * tileWidth;
    const y = Math.floor(tile.originalOrder / GRID_SIZE) * tileHeight;

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${imgDimensions.width}px ${imgDimensions.height}px`,
      backgroundPosition: `-${x}px -${y}px`,
    };
  };

  const TILE_DISPLAY_SIZE =
    Math.min(300, imgDimensions.width || 300) / GRID_SIZE - 4; // approx, accounting for gap

  return (
    <div className="flex flex-col items-center">
      {isSolved && (
        <p className="text-green-400 font-bold text-lg mb-4 animate-pulse">
          Puzzle Solved!
        </p>
      )}
      <div
        className="grid gap-1 p-1 bg-slate-700 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width:
            imgDimensions.width > 0
              ? `${Math.min(imgDimensions.width, 300)}px`
              : "300px",
          height:
            imgDimensions.height > 0
              ? `${Math.min(imgDimensions.height, 300)}px`
              : "300px",
        }}
      >
        <AnimatePresence>
          {tiles.map((tile) => (
            <motion.div
              key={tile.id} // Use stable id for framer-motion
              layout // Enable automatic animation for layout changes
              initial={{ opacity: 0.8, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() =>
                tile.value !== EMPTY_VALUE && handleTileClick(tile.id)
              }
              className={`aspect-square flex items-center justify-center text-xl font-bold 
                          border border-slate-600 transition-colors duration-150
                          ${
                            tile.value === EMPTY_VALUE
                              ? "bg-slate-800/50 cursor-default"
                              : "bg-slate-500/30 text-white hover:bg-slate-400/50 cursor-pointer"
                          }
                          ${
                            isSolved && tile.value !== EMPTY_VALUE
                              ? "!border-green-500 !opacity-100"
                              : ""
                          }`}
              style={{
                ...getTileStyle(tile),
                width: `${TILE_DISPLAY_SIZE}px`,
                height: `${TILE_DISPLAY_SIZE}px`,
              }}
            >
              {/* Optional: Show piece number for debugging
              {tile.value !== EMPTY_VALUE && (
                <span className="bg-black/50 text-white px-1 rounded text-xs opacity-60">
                  {tile.value}
                </span>
              )} */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow transition-colors"
      >
        Reset Puzzle
      </button>
    </div>
  );
};

export default SlidingPuzzle;
