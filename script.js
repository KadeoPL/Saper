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


function createGameBoard(level){
    const gameBoard = document.querySelector('.game-board');
    switch (level) {
        case 'easy':
            for (let i=0; i < 64; i++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(8, 1fr)';
                gameBoard.style.gridTemplateRows = 'repeat(8, 1fr)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
        case 'medium':
            for (let i=0; i < 256; i++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(16, 1fr)';
                gameBoard.style.gridTemplateRows = 'repeat(16, 1fr)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
        case 'hard':
            for (let i=0; i < 480; i++) {
                const gameBoardCell = document.createElement('div');
                gameBoard.style.gridTemplateColumns = 'repeat(30, 1fr)';
                gameBoard.style.gridTemplateRows = 'repeat(16, 1fr)';
                gameBoardCell.classList.add('game-cells');
                gameBoard.appendChild(gameBoardCell);
            }
            break;
      }
    
      boardCells = Array.from(document.querySelectorAll('.game-board > div'));
      numOfCells = boardCells.length;
      game();

}

function playGame() {
    boardCells.forEach((cell) => {
        cell.addEventListener('click', () => {
            generateMines();
            if(cell.classList.contains('mine')){
                alert('Tutaj bomba!');
            }
        });
    });
}


function generateMines() {
    while (numOfMines > 0) {
        let index = Math.floor(Math.random() * numOfCells);
        boardCells[index].classList.add('mine');
        numOfMines--;
    }
}