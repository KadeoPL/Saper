const popupWindow = document.querySelector('.popup');
const popupButtons = document.querySelectorAll('.popup > button');
const gameWindow = document.querySelector('.game-window');
let numOfMines = 0;
let boardCells = []
let numOfCells = 0;

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

popupButtons.forEach(button => {
    button.addEventListener('click', clickPopupButtons);
  });


/*function createGameBoard(level){
    const gameBoard = document.querySelector('.game-board');
    switch (level) {
        case 'easy':
            for (let x=0; x < 8; x++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(8, 50px)';
                gameBoard.style.gridTemplateRows = 'repeat(8, 50px)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
        case 'medium':
            for (let i=0; i < 256; i++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(16, 40px)';
                gameBoard.style.gridTemplateRows = 'repeat(16, 40px)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
        case 'hard':
            for (let i=0; i < 480; i++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(30, 30px)';
                gameBoard.style.gridTemplateRows = 'repeat(16, 30px)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
      }
    
      boardCells = Array.from(document.querySelectorAll('.game-board > div'));
      numOfCells = boardCells.length;
      playGame();

}*/

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
    boardCells.forEach((cell) => {
        cell.addEventListener('click', () => {
            generateMines();
            cell.classList.contains('mine') ? alert('BOMBA') : cell.classList.add('empty');
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            checkAdjacentCellsForMine(x, y);
            checkAdjacentCellsForEmpty(x, y);            
        });
    });
}

function checkAdjacentCellsForMine(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) continue; // Pominięcie aktualnie klikniętej komórki
            const adjacentCell = getCellByCoordinates(i, j);
            if (adjacentCell && adjacentCell.classList.contains('mine')) {
                alert('Bomba w sąsiedniej komórce!');
            }
        }
    }
}

function checkAdjacentCellsForEmpty(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) continue; // Pominięcie aktualnie klikniętej komórki
            const adjacentCell = getCellByCoordinates(i, j);
            if (adjacentCell && adjacentCell.classList.contains('empty')) {
                alert('Sąsiednia komórka jest pusta!');
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
    while (numOfMines >= 0) {
        let index = Math.floor(Math.random() * numOfCells);
        boardCells[index].classList.add('mine');
        numOfMines--;
    }
}
