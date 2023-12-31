const popupStartWindow = document.getElementById('popup-game-start');
const popupEndWindow = document.getElementById('popup-game-end');
const popupButtons = document.querySelectorAll('.level-buttons > button');
const restartButton = document.getElementById('restart-button');
const gameWindow = document.querySelector('.game-window');
const minesShow = document.querySelector('.mine');
const minesCounter = document.querySelector('.mines-counter');
const timeBox = document.querySelector('.time-box');
let startTime = Date.now();
let numOfMines = 0;
let boardCells = [];
let width = 0;
let height = 0;
let gamesOver = false;
let flagArray = [];
let bombsArray = [];
let clickFirst = true;

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

function clickPopupButtons(event) {
  const selectedButton = event.target;
  const className = selectedButton.className;

  switch (className) {
    case 'easy':  
    popupStartWindow.style.visibility = 'hidden';
      setTimeout(function() {
        gameWindow.style.visibility = 'visible';
        createGameBoard('easy');
      }, 500);
      break;
    case 'medium':
      popupStartWindow.style.visibility = 'hidden';
      setTimeout(function() {
        gameWindow.style.visibility = 'visible';
        createGameBoard('medium');
      }, 500);
      break;
    case 'hard':
      popupStartWindow.style.visibility = 'hidden';
      setTimeout(function() {
        gameWindow.style.visibility = 'visible';
        createGameBoard('hard');
      }, 500);
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
      numOfMines = 10;
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
      numOfMines = 40;
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
      numOfMines = 99;  
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
    
    

    boardCells.forEach((row) => {
      row.forEach((cell) => {
        cell.addEventListener('mousedown', (event) => {
          if(event.button === 0) {
            if (clickFirst) {
              generateMines(numOfMines);
              startTime = Date.now();
              startTimer();
              clickFirst = false;
              console.log(bombsArray);
            }
            clickCell((cell.dataset.x), (cell.dataset.y));
          } else if (event.button === 2) {
            if (clickFirst) {
              generateMines(numOfMines);
              startTime = Date.now();
              startTimer();
              clickFirst = false;
            }
            clickFlag(cell);
          }
          if(numOfMines === 0 && !gamesOver){
            if(checkWin(flagArray)){
              endGameWin();
          }
        }
          
        });
      });
      minesCounter.innerHTML = `Mines: ${numOfMines}`;
      timeBox.innerHTML = 'Time: 00:00';
    });
    
}

function generateMines(numberOfMines) {
  const numberOfRows = boardCells.length;
  const numberOfColumns = boardCells[0].length;

  while(numberOfMines > 0) {
    let x = Math.floor(Math.random() * numberOfRows);
    let y = Math.floor(Math.random() * numberOfColumns);
    if (!boardCells[x][y].dataset.value && !boardCells[x][y].classList.contains('checked')) {
      boardCells[x][y].dataset.value = 'mine';
      numberOfMines--;
    }
  }
  bombsArray = Array.from(document.querySelectorAll('[data-value="mine"]'));
}

function clickCell(x, y) {
  if (boardCells[x][y].dataset.value === 'mine') {
    endGameLoss();
    return;
  }

  if (gamesOver) return;

  if (!(boardCells[x][y].classList.contains('checked')) && !(boardCells[x][y].classList.contains('flag'))) {
    countMines(x, y);
  }
}

function clickFlag(cell){
  
  if (gamesOver) return;
  if (numOfMines >= 0) {
    if (!(cell.classList.contains('checked'))){
      if (!cell.classList.contains('flag')) {
        
        if(numOfMines > 0) {
          numOfMines--;
          cell.classList.add('flag');
          flagArray.push(cell);
        }
        minesCounter.innerHTML = `Mines: ${numOfMines}`;
        
        console.log(flagArray);
      } else {
        cell.classList.remove('flag');
        numOfMines++;
        minesCounter.innerHTML = `Mines: ${numOfMines}`;
        flagArray = flagArray.filter(item => item !== cell);
        console.log(flagArray);
      }
  }
}
}

function countMines(x, y) {
  if (boardCells[x][y].classList.contains('checked') || boardCells[x][y].classList.contains('flag')) {
    return;
  }

  boardCells[x][y].classList.add('checked');

  let numMines = 0;
  for (let offsetX = -1; offsetX <= 1; offsetX++) {
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      if (offsetX === 0 && offsetY === 0) continue;

      const neighborX = parseInt(x) + offsetX;
      const neighborY = parseInt(y) + offsetY;

      if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
        if (boardCells[neighborX][neighborY].dataset.value === 'mine') {
          numMines++;
        }
      }
    }
  }

  if (numMines > 0) {
    setAdjacentCellColor(boardCells[x][y], numMines);
    boardCells[x][y].innerHTML = numMines;
  } else {

    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        if (offsetX === 0 && offsetY === 0) continue;

        const neighborX = parseInt(x) + offsetX;
        const neighborY = parseInt(y) + offsetY;

        if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
          countMines(neighborX, neighborY);
        }
      }
    }
  }

  boardCells[x][y].dataset.numMines = numMines;
}

function setAdjacentCellColor(cell, numOfAdjacentMines) {
  switch (numOfAdjacentMines) {
    case 1:
      cell.classList.add('one');
      break;
    case 2:
      cell.classList.add('two');
      break;
    case 3:
      cell.classList.add('three');
      break;
    case 4:
      cell.classList.add('four');
      break;
    case 5:
      cell.classList.add('five');
      break;
    case 6:
      cell.classList.add('six');
      break;
    case 7:
      cell.classList.add('seven');
      break;
    case 8:
      cell.classList.add('eight');
      break;
  }
}

function endGameLoss() {
  gamesOver = true;
  for (i = 0; i < bombsArray.length; i++){
    bombsArray[i].classList.add('mine');
  };
  popupEndWindow.style.visibility = "visible";
  const text = document.querySelector('.popup-text');
  text.innerHTML = "You loss! <br> Try again!";
  restartButton.addEventListener('click', reload);
  stopTimer();
}

function reload(){
  setTimeout(function() {
    location.reload();
  }, 500);
}
function endGameWin(){
  gamesOver = true;
  popupEndWindow.style.visibility = "visible";
  const text = document.querySelector('.popup-text');
  text.innerHTML = "You won! <br> Good job";
  restartButton.addEventListener('click', reload);
  stopTimer();
  return;
}

function countTime() {
  let currentTime = Date.now();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  let minutes = Math.floor(elapsedTime / 60);
  let seconds = elapsedTime % 60;

  
  let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;

  timeBox.innerHTML = 'Time: ' + formattedTime;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  intervalId = setInterval(countTime, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function checkWin(arrFlags) {
  for (let i = 0; i < arrFlags.length; i++) {
    if (arrFlags[i].dataset.value === 'mine') {
      return true;
    }
  }

  return false;
}

