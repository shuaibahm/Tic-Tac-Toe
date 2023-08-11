const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = new Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  if (cells.every(cell => cell !== null)) {
    return 'tie';
  }

  return null;
}

function handleClick(index) {
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;
  const cellElement = document.getElementById(index);
  cellElement.innerText = currentPlayer;
  cellElement.classList.add(currentPlayer.toLowerCase());

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    if (winner === 'tie') {
      message.innerText = "It's a tie!";
    } else {
      message.innerText = `Player ${winner} wins!`;
    }
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i;
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

createBoard();