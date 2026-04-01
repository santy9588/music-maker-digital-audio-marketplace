export const BOARD_SIZE = 8;
export const CANDY_TYPES = 6;
export const MOVES_PER_LEVEL = 20;

export function getTargetScore(level: number): number {
  return 500 + (level - 1) * 400;
}

export function createBoardNoMatches(): number[] {
  const board = new Array(BOARD_SIZE * BOARD_SIZE).fill(0);
  for (let i = 0; i < board.length; i++) {
    const row = Math.floor(i / BOARD_SIZE);
    const col = i % BOARD_SIZE;
    const forbidden = new Set<number>();
    if (col >= 2 && board[i - 1] === board[i - 2]) forbidden.add(board[i - 1]);
    if (row >= 2 && board[i - BOARD_SIZE] === board[i - 2 * BOARD_SIZE]) {
      forbidden.add(board[i - BOARD_SIZE]);
    }
    let type: number;
    let attempts = 0;
    do {
      type = Math.floor(Math.random() * CANDY_TYPES);
      attempts++;
    } while (forbidden.has(type) && attempts < 20);
    board[i] = type;
  }
  return board;
}

export function findMatches(board: number[]): Set<number> {
  const matched = new Set<number>();
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE - 2; col++) {
      const i = row * BOARD_SIZE + col;
      const c = board[i];
      if (c < 0) continue;
      if (board[i + 1] === c && board[i + 2] === c) {
        let end = col + 2;
        while (end + 1 < BOARD_SIZE && board[row * BOARD_SIZE + end + 1] === c)
          end++;
        for (let k = col; k <= end; k++) matched.add(row * BOARD_SIZE + k);
      }
    }
  }
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row < BOARD_SIZE - 2; row++) {
      const i = row * BOARD_SIZE + col;
      const c = board[i];
      if (c < 0) continue;
      if (
        board[(row + 1) * BOARD_SIZE + col] === c &&
        board[(row + 2) * BOARD_SIZE + col] === c
      ) {
        let end = row + 2;
        while (
          end + 1 < BOARD_SIZE &&
          board[(end + 1) * BOARD_SIZE + col] === c
        )
          end++;
        for (let k = row; k <= end; k++) matched.add(k * BOARD_SIZE + col);
      }
    }
  }
  return matched;
}

export function calcScore(matchSet: Set<number>, chain: number): number {
  const size = matchSet.size;
  const base = size <= 3 ? 30 * size : size === 4 ? 240 : 100 * size;
  const multiplier = 1 + chain * 0.5;
  return Math.round(base * multiplier);
}

export function applyGravity(board: number[]): number[] {
  const newBoard = [...board];
  for (let col = 0; col < BOARD_SIZE; col++) {
    let writeRow = BOARD_SIZE - 1;
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      if (newBoard[row * BOARD_SIZE + col] !== -1) {
        newBoard[writeRow * BOARD_SIZE + col] =
          newBoard[row * BOARD_SIZE + col];
        if (writeRow !== row) newBoard[row * BOARD_SIZE + col] = -1;
        writeRow--;
      }
    }
    while (writeRow >= 0) {
      newBoard[writeRow * BOARD_SIZE + col] = -1;
      writeRow--;
    }
  }
  return newBoard;
}

export function refillBoard(board: number[]): {
  board: number[];
  newIndices: Set<number>;
} {
  const newBoard = [...board];
  const newIndices = new Set<number>();
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i] === -1) {
      newBoard[i] = Math.floor(Math.random() * CANDY_TYPES);
      newIndices.add(i);
    }
  }
  return { board: newBoard, newIndices };
}

export function swapCells(board: number[], a: number, b: number): number[] {
  const newBoard = [...board];
  [newBoard[a], newBoard[b]] = [newBoard[b], newBoard[a]];
  return newBoard;
}

export function isAdjacent(a: number, b: number): boolean {
  const rowA = Math.floor(a / BOARD_SIZE);
  const colA = a % BOARD_SIZE;
  const rowB = Math.floor(b / BOARD_SIZE);
  const colB = b % BOARD_SIZE;
  return (
    (rowA === rowB && Math.abs(colA - colB) === 1) ||
    (colA === colB && Math.abs(rowA - rowB) === 1)
  );
}

// Candy Crush design colors
export const CANDY_COLORS: string[] = [
  "#E53935", // red
  "#FF8C2A", // orange
  "#FFD54A", // yellow
  "#42C66A", // green
  "#2E86FF", // blue
  "#A35CFF", // purple
];

export const CANDY_DARK_COLORS: string[] = [
  "#B71C1C",
  "#D46A00",
  "#F0A800",
  "#1A9448",
  "#0A5CD4",
  "#7020D0",
];

export const CANDY_LIGHT_COLORS: string[] = [
  "#FF7070",
  "#FFB870",
  "#FFE87A",
  "#80E89A",
  "#7AB8FF",
  "#CC9AFF",
];

export const CANDY_EMOJIS: string[] = ["🍎", "🍊", "⭐", "🍀", "💎", "🍇"];
