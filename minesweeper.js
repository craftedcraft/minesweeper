document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: generateCells(4)
}

function generateCells (size) {

var cells = []

for (i = 0; i < size; i++) {
  for (j = 0; j < size; j++) {

      cell = {
        row: i,
        col: j,
        isMine: Math.floor(Math.random()*1.5),
        isMarked: false,
        hidden: true
      }

      cells.push(cell)
    }
  }

  return cells
}

function startGame () {

// board.cells[4].isMine = true
// board.cells[7].isMine = true
// board.cells[1].isMine = true
// board.cells[22].isMine = true
// board.cells[9].isMine = true
// board.cells[8].isMine = true

  lib.initBoard()

  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }

  document.addEventListener('click', checkForWin); 
  document.addEventListener('contextmenu', checkForWin);

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // loop through array of cells
  // check for isMinne.False is visable
  // check mines are hidden

  for (var i = 0; i < board.cells.length; i++) {

    var checkWinner = board.cells[i]
    if(checkWinner.isMine && checkWinner.isMarked) {
      return;

     }
     else if(!checkWinner.isMine && checkWinner.hidden){
       return;
    }
  };

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
    lib.displayMessage('How Good?!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0

  for (j = 0; j < surrounding.length; j++) {
    if (surrounding[j].isMine) {
      count++
    }
  }

  return count
}

