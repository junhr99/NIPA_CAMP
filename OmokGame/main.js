const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let turn = 0; //0: white, 1: black
let board = new Array(30);
for (var i = 0; i < 30; i++) {
  board[i] = new Array(30).fill(".");
}
board[14][14] = 1;
let x = 15;
let y = 15;
let consecutiveStones = 0;

function checkConsecutiveStones(row, col, dx, dy) {
  let count = 0;
  while (
    row >= 0 &&
    row < 30 &&
    col >= 0 &&
    col < 30 &&
    board[row][col] === turn
  ) {
    count++;
    row += dy;
    col += dx;
  }
  return count;
}

function checkWinningMove(row, col) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1], // Vertical, Horizontal, Diagonal (both directions)
  ];

  for (const [dx, dy] of directions) {
    const count1 = checkConsecutiveStones(row, col, dx, dy);
    const count2 = checkConsecutiveStones(row, col, -dx, -dy);
    const totalCount = count1 + count2 - 1;
    if (totalCount >= 5) return true;
  }

  return false;
}

function checkDraw() {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 30; col++) {
      if (board[row][col] === ".") return false;
    }
  }
  return true;
}

function printBoard() {
  console.clear();
  console.log(
    "  " +
      Array.from(
        { length: 30 },
        (_, i) => (i + 1 < 10 ? " " : "") + String(i + 1)
      ).join("")
  );

  for (var i = 0; i < 30; i++) {
    console.log(String(i + 1).padStart(2, " "), board[i].join(" "));
  }
}
printBoard();
console.log("Game Start: Player Black placed stone at (15,15)");
console.log("Now Turn: Player White, ex:(13,15)");

rl.on("line", (line) => {
  [x, y] = line.slice(1, -1).split(",");
  x = x - 1;
  y = y - 1;
  if (isNaN(x) || isNaN(y) || x < 0 || x >= 30 || y < 0 || y >= 30) {
    console.log(
      "Invalid input. Please enter valid x and y (1<=x<=30, 1<=y<=30)"
    );
    return;
  }

  if (board[x][y] !== ".") {
    console.log("Cell already occupied. Please choose another location.");
    return;
  }

  board[x][y] = turn;

  consecutiveStones = 0;

  printBoard();

  if (checkWinningMove(x, y)) {
    console.log(`Game over. Player ${turn === 1 ? "Black" : "White"} wins!`);
    process.exit(0);
  }

  if (checkDraw()) {
    console.log("Game over. It's a draw!");
    process.exit(0);
  }
  console.log(`Player ${turn === 1 ? "Black" : "White"} placed stone at`, line);
  turn = turn == 0 ? 1 : 0;
  console.log(`Now Turn: Player ${turn === 1 ? "Black" : "White"}, ex:(13,15)`);
  //   if (turn == 0) {
  //     console.log("Turn: Player White, ex: (13,15)");
  //   } else {
  //     console.log("Turn: Player Black, ex: (13,15)");
  //   }

  //rl.close();
});

// rl.on("close", () => {
//   process.exit();
// });

setTimeout(() => {
  console.log("Game over. 5mins limit exceeded.");
  process.exit(0);
}, 5 * 60 * 1000);
