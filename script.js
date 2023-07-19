const popupWindow = document.querySelector('.popup');
const popupButtons = document.querySelectorAll('.popup > button');
const gameWindow = document.querySelector('.game-window');
const minesShow = document.querySelector('.mine');
let numOfMines = 0;
let boardCells = [];
let width = 0;
let height = 0;
let gamesOver = false;



function clickPopupButtons(event) {
  const selectedButton = event.target;
  const className = selectedButton.className;

  switch (className) {
    case 'easy':
      numOfMines = 10;
      createGameBoard('easy');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
      break;
    case 'medium':
      numOfMines = 40;
      createGameBoard('medium');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
      break;
    case 'hard':
      numOfMines = 99;  
      createGameBoard('hard');
      gameWindow.style.visibility = 'visible';
      popupWindow.style.visibility = 'hidden';
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
      width = 8;
      height = 8;
      gameBoard.style.gridTemplateColumns = 'repeat(8, 50px)';
      gameBoard.style.gridTemplateRows = 'repeat(8, 50px)';
      boardCells = new Array(width).fill(null).map(() => new Array(height).fill(null));
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
          boardCells[x][y] = gameBoardCell;
        }
      }
      break;
    case 'medium':
      width = 16;
      height = 16;
      gameBoard.style.gridTemplateColumns = 'repeat(16, 40px)';
      gameBoard.style.gridTemplateRows = 'repeat(16, 40px)';
      boardCells = new Array(width).fill(null).map(() => new Array(height).fill(null));
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
          boardCells[x][y] = gameBoardCell;
        }
      }
      break;
    case 'hard':
      width = 30;
      height = 16;
      gameBoard.style.gridTemplateColumns = 'repeat(30, 30px)';
      gameBoard.style.gridTemplateRows = 'repeat(16, 30px)';
      boardCells = new Array(width).fill(null).map(() => new Array(height).fill(null));
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const gameBoardCell = document.createElement('div');
          gameBoardCell.classList.add('game-cells');
          gameBoardCell.dataset.x = x;
          gameBoardCell.dataset.y = y;
          gameBoard.appendChild(gameBoardCell);
          boardCells[x][y] = gameBoardCell;
        }
      }
      break;
    }
    
    generateMines(numOfMines);

    boardCells.forEach((row) => {
      row.forEach((cell) => {
        cell.addEventListener('click', () => {
          console.log(cell.dataset.x, cell.dataset.y);
          clickCell((cell.dataset.x), (cell.dataset.y));
        });
      });
    });

    console.log(boardCells);
}

function generateMines(numOfMines) {
  const numberOfRows = boardCells.length;
  const numberOfColumns = boardCells[0].length;

  while(numOfMines > 0) {
    let x = Math.floor(Math.random() * numberOfRows);
    let y = Math.floor(Math.random() * numberOfColumns);
    if (!boardCells[x][y].dataset.value) {
      boardCells[x][y].dataset.value = 'mine';
      boardCells[x][y].classList.add('mine');
      numOfMines--;
    }
  }
}


function clickCell(x, y) {
  if (boardCells[x][y].dataset.value === 'mine') {
    endGameLoss();
    return;
  }

  if (gamesOver) return;

  if (boardCells[x][y].classList.contains('checked') || boardCells[x][y].dataset.value === 'flag') return;
  let numMines = 0;
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      if (offsetX === 0 && offsetY === 0) continue; 
  
      const neighborX = parseInt(x) + parseInt(offsetX);
      const neighborY = parseInt(y) + parseInt(offsetY);
      console.log("Sąsiad X:", neighborX, "Sąsiad Y:", neighborY);
  
      if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
        if (boardCells[neighborX][neighborY].dataset.value === 'mine') {
          console.log("Sąsiad X:", neighborX, "Sąsiad Y:", neighborY);
          numMines++;
        }
      }
    }
  }
  if (numMines > 0) {
    setAdjacentCellColor(boardCells[x][y], numMines);
    boardCells[x][y].innerHTML = numMines;
  }
  boardCells[x][y].classList.add('checked');
 
  /*if ((x-1 < 0 || x + 1 >= width) && (y-1 < 0 || y + 1 >= width)){
    if (boardCells[x-1][y-1].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x][y-1].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x+1][y-1].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x-1][y].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x+1][y].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x+1][y+1].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x][y+1].dataset.value === 'mine'){
      numOfMines++;
    }
    if (boardCells[x+1][y+1].dataset.value === 'mine'){
      numOfMines++;
    }
    console.log(numOfMines);
    
 }*/

}

  /*let adjacentMines = 0;
  for (let i = x - 1; i = x + 1; i++) {
    for (let j = y - 1; j = y + 1; j++) {
      if (i === x && j === y) continue;
      if (boardCells[i][j].dataset.value === 'mine') {
        adjacentMines++;
      }
    }
  }
  
  /*boardCells[x][y].classList.add('empty');
  if (adjacentMines > 0) {
    setAdjacentCellColor(boardCells[x][y], adjacentMines);
    boardCells[x][y].innerHTML = adjacentMines;
  }
  console.log(adjacentMines);*/

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
    case 7:
      cell.classList.add('pink');
      break;
    case 8:
      cell.classList.add('pink');
      break;
  }
}

function endGameLoss() {
  gamesOver = true;
  alert('Bomba! Koniec gry!');
}


/*function playGame() {
  let clickOnce = false;
  boardCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (!clickOnce) {
        clickOnce = true;
      }
      if (cell.dataset.value === 'mine') {
        endGameLoss();
      } else {
        cell.classList.add('empty');
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
      }
    });
  });
}*/


/*function checkAdjacentCells(x, y) {
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
}*/

/*function getCellByCoordinates(x, y) {
  return boardCells.find((cell) => {
    return parseInt(cell.dataset.x) === x && parseInt(cell.dataset.y) === y;
  });
}*/

