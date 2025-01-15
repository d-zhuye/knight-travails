/*
What do I want to create to store the graph?

A Binary Tree? An Array? An Adjacency Matrix? 

If the knight starts at [3, 3], it can move into the following vertices:
  [1, 2] Down One, Left Two
  [5, 2] Down One, Left Two
  [2, 1] Down Two, Left One
  [4, 1] Down Two, Right One

Its very simple to traverse the graph with basic set of restrictions for how knight can move
The question now becomes, how should the knight traverse the path as to find the shortest route?

I do need a variable to keep track of the knight's position. 

*/

class ChessPiece {
  constructor(name, rowPos = null, colPos = null) {
    this.name = name;
    this.rowPos = rowPos;
    this.colPos = colPos;
  }
}

const chessBoard = [];
const knight = new ChessPiece("knight", 4, 3);

// Nested loop to create 8x8 matrix to represent chessboard;
for (let i = 0; i < 8; i++) {
  let row = [];
  for (let i = 0; i < 8; i++) {
    row.push(0);
  }

  chessBoard.push(row);
}

chessBoard[knight.rowPos][knight.colPos] = 1;
console.log(chessBoard);

// Possible moves as an adjacency list?
function possibleMoves(knight) {
  let array = [];
  // Traverse Top Row
  if (knight.rowPos - 2 >= 0) {
    if (knight.colPos - 1 >= 0) {
      array.push([knight.rowPos - 2, knight.colPos - 1]);
    }

    if (knight.colPos + 1 <= 7) {
      array.push([knight.rowPos - 2, knight.colPos + 1]);
    }
  }

  // Traverse Second Row
  if (knight.rowPos - 1 >= 0) {
    if (knight.colPos - 2 >= 0) {
      array.push([knight.rowPos - 1, knight.colPos - 2]);
    }

    if (knight.colPos + 2 <= 7) {
      array.push([knight.rowPos - 1, knight.colPos + 2]);
    }
  }

  // Traverse Third Row
  if (knight.rowPos + 1 <= 7) {
    if (knight.colPos - 2 >= 0) {
      array.push([knight.rowPos + 1, knight.colPos - 2]);
    }

    if (knight.colPos + 2 <= 7) {
      array.push([knight.rowPos + 1, knight.colPos + 2]);
    }
  }

  // Traverse Fourth Row
  if (knight.rowPos + 2 <= 7) {
    if (knight.colPos - 1 >= 0) {
      array.push([knight.rowPos + 2, knight.colPos - 1]);
    }

    if (knight.colPos + 1 <= 7) {
      array.push([knight.rowPos + 2, knight.colPos + 1]);
    }
  }

  return array;
}

let testPossible = possibleMoves(knight);
console.log(testPossible);