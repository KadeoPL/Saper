const popupWindow = document.querySelector('.popup');
const popupButtons = document.querySelectorAll('.popup > button');
const gameWindow = document.querySelector('.game-window');
const minesShow = document.querySelector('.mine');
let numOfMines = 0;
let boardCells = [];
let numOfCells = 0;
let boardMines = [];

function clickPopupButtons(event) {
  const selectedButton = event.target;
  const className = selectedButton.className;

  switch (className) {
    case 'easy':
      createGameBoard('easy');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
      numOfMines = 10;
      break;
    case 'medium':
      createGameBoard('medium');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
      numOfMines = 40;
      break;
    case 'hard':
      createGameBoard('hard');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
      numOfMines = 99;
      break;
  }
}

popupButtons.forEach((button) => {
  button.addEventListener('click', clickPopupButtons);
});

function createGameBoard(level) {
  const gameBoard = document.querySelector('.game-board');

  switch (level) {
    case 'easy':
      gameBoard.style.gridTemplateColumns = 'repeat(8, 50px)';
      gameBoard.style.gridTemplateRows = 'repeat(8, 50px)';
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
        }
      }
      break;
    case 'medium':
      gameBoard.style.gridTemplateColumns = 'repeat(16, 40px)';
      gameBoard.style.gridTemplateRows = 'repeat(16, 40px)';
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
        }
      }
      break;
    case 'hard':
      gameBoard.style.gridTemplateColumns = 'repeat(30, 30px)';
      gameBoard.style.gridTemplateRows = 'repeat(16, 30px)';
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 30; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
        }
      }
      break;
  }

  boardCells = Array.from(document.querySelectorAll('.game-board > div'));
  numOfCells = boardCells.length;
  playGame();
}

function playGame() {
  let clickOnce = false;
  boardCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (!clickOnce) {
        generateMines();
        clickOnce = true;
      }
      if (cell.dataset.value === 'mine') {
        endGameLoss();
      } else {
        cell.classList.add('empty');
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        checkCell(x, y);
      }
    });
  });
}

function endGameLoss() {
  boardMines.forEach((index) => {
    index.classList.add('mine');
  });

  alert('Bomba! Koniec gry!');
}

function checkAdjacentCells(x, y) {
  let numOfAdjacentMines = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;
      const adjacentCell = getCellByCoordinates(i, j);
      if (adjacentCell && adjacentCell.dataset.value === 'mine') {
        numOfAdjacentMines++;
      }
    }
  }

  const currentCell = getCellByCoordinates(x, y);
  if (currentCell && !currentCell.classList.contains('empty')) {
    currentCell.classList.add('empty');
    if (numOfAdjacentMines > 0) {
      currentCell.innerText = numOfAdjacentMines.toString();
      setAdjacentCellColor(currentCell, numOfAdjacentMines);
    }
  }

  if (numOfAdjacentMines === 0) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i === x && j === y) continue;
        const adjacentCell = getCellByCoordinates(i, j);
        if (adjacentCell && !adjacentCell.classList.contains('empty')) {
          checkAdjacentCells(i, j);
        }
      }
    }
  }
}

function getCellByCoordinates(x, y) {
  return boardCells.find((cell) => {
    return parseInt(cell.dataset.x) === x && parseInt(cell.dataset.y) === y;
  });
}

function generateMines() {
  while (numOfMines > 0) {
    let index = Math.floor(Math.random() * numOfCells);
    if (!boardCells[index].dataset.value) {
      boardCells[index].dataset.value = 'mine';
      boardMines.push(boardCells[index]);
      numOfMines--;
    }
  }
}

function setAdjacentCellColor(cell, numOfAdjacentMines) {
  switch (numOfAdjacentMines) {
    case 1:
      cell.classList.add('blue');
      break;
    case 2:
      cell.classList.add('green');
      break;
    case 3:
      cell.classList.add('red');
      break;
    case 4:
      cell.classList.add('orange');
      break;
    case 5:
      cell.classList.add('aqua');
      break;
    case 6:
      cell.classList.add('pink');
      break;
  }
}
