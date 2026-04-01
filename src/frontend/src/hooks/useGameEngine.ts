import { useCallback, useRef, useState } from "react";
import {
  MOVES_PER_LEVEL,
  applyGravity,
  calcScore,
  createBoardNoMatches,
  findMatches,
  getTargetScore,
  isAdjacent,
  refillBoard,
  swapCells,
} from "../game/engine";

export interface GameEngineReturn {
  board: number[];
  selected: number | null;
  exploding: Set<number>;
  newCandies: Set<number>;
  invalidCells: Set<number>;
  score: number;
  moves: number;
  targetScore: number;
  isAnimating: boolean;
  handleTap: (index: number) => void;
  handleSwipe: (fromIndex: number, toIndex: number) => void;
  resetBoard: () => void;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGameEngine(
  level: number,
  initialScore: number,
  onLevelComplete: (score: number) => void,
  onGameOver: (score: number) => void,
): GameEngineReturn {
  const targetScore = getTargetScore(level);

  const [board, setBoard] = useState<number[]>(() => createBoardNoMatches());
  const [selected, setSelected] = useState<number | null>(null);
  const [exploding, setExploding] = useState<Set<number>>(new Set());
  const [newCandies, setNewCandies] = useState<Set<number>>(new Set());
  const [invalidCells, setInvalidCells] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(initialScore);
  const [moves, setMoves] = useState(MOVES_PER_LEVEL);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatingRef = useRef(false);
  const selectedRef = useRef<number | null>(null);
  const boardRef = useRef<number[]>(board);
  const scoreRef = useRef(initialScore);
  const movesRef = useRef(MOVES_PER_LEVEL);

  const processChain = useCallback(
    async (startBoard: number[], startScore: number): Promise<number> => {
      animatingRef.current = true;
      setIsAnimating(true);

      let currentBoard = startBoard;
      let currentScore = startScore;
      let chain = 0;

      while (true) {
        const matches = findMatches(currentBoard);
        if (matches.size === 0) break;

        const gained = calcScore(matches, chain);
        currentScore += gained;

        setExploding(new Set(matches));
        setScore(currentScore);
        scoreRef.current = currentScore;

        await delay(400);

        currentBoard = currentBoard.map((c, i) => (matches.has(i) ? -1 : c));
        setExploding(new Set());
        currentBoard = applyGravity(currentBoard);

        const { board: filled, newIndices } = refillBoard(currentBoard);
        currentBoard = filled;
        boardRef.current = currentBoard;
        setBoard([...currentBoard]);
        setNewCandies(new Set(newIndices));

        await delay(380);
        setNewCandies(new Set());
        chain++;
      }

      animatingRef.current = false;
      setIsAnimating(false);
      boardRef.current = currentBoard;
      setBoard([...currentBoard]);
      return currentScore;
    },
    [],
  );

  const executeSwap = useCallback(
    (sel: number, target: number) => {
      if (animatingRef.current) return;
      if (!isAdjacent(sel, target)) return;

      selectedRef.current = null;
      setSelected(null);

      const currentBoard = boardRef.current;
      const swapped = swapCells(currentBoard, sel, target);
      const matches = findMatches(swapped);

      if (matches.size === 0) {
        setInvalidCells(new Set([sel, target]));
        setTimeout(() => setInvalidCells(new Set()), 350);
        return;
      }

      const newMoves = movesRef.current - 1;
      movesRef.current = newMoves;
      setMoves(newMoves);
      boardRef.current = swapped;
      setBoard(swapped);

      processChain(swapped, scoreRef.current).then((finalScore) => {
        if (finalScore >= targetScore) {
          onLevelComplete(finalScore);
        } else if (newMoves <= 0) {
          onGameOver(finalScore);
        }
      });
    },
    [targetScore, processChain, onLevelComplete, onGameOver],
  );

  const handleTap = useCallback(
    (index: number) => {
      if (animatingRef.current) return;

      const sel = selectedRef.current;

      if (sel === null) {
        selectedRef.current = index;
        setSelected(index);
        return;
      }

      if (sel === index) {
        selectedRef.current = null;
        setSelected(null);
        return;
      }

      if (!isAdjacent(sel, index)) {
        selectedRef.current = index;
        setSelected(index);
        return;
      }

      executeSwap(sel, index);
    },
    [executeSwap],
  );

  const handleSwipe = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (animatingRef.current) return;
      selectedRef.current = null;
      setSelected(null);
      executeSwap(fromIndex, toIndex);
    },
    [executeSwap],
  );

  const resetBoard = useCallback(() => {
    const newBoard = createBoardNoMatches();
    boardRef.current = newBoard;
    scoreRef.current = initialScore;
    movesRef.current = MOVES_PER_LEVEL;
    setBoard(newBoard);
    setSelected(null);
    selectedRef.current = null;
    setExploding(new Set());
    setNewCandies(new Set());
    setScore(initialScore);
    setMoves(MOVES_PER_LEVEL);
    animatingRef.current = false;
    setIsAnimating(false);
  }, [initialScore]);

  return {
    board,
    selected,
    exploding,
    newCandies,
    invalidCells,
    score,
    moves,
    targetScore,
    isAnimating,
    handleTap,
    handleSwipe,
    resetBoard,
  };
}
