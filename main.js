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
const knight = new ChessPiece("knight", 5, 5);

// Nested loop to create 8x8 matrix to represent chessboard;
for (let i = 0; i < 8; i++) {
  let row = [];
  for (let i = 0; i < 8; i++) {
    row.push(0);
  }

  chessBoard.push(row);
}

chessBoard[knight.rowPos][knight.colPos] = 1;

// Possible moves as an adjacency list?
function findMoves(coords) {
  let possibleMoves = [];
  // Traverse Top Row
  if (knight.rowPos - 2 >= 0) {
    if (knight.colPos - 1 >= 0) {
      possibleMoves.push([knight.rowPos - 2, knight.colPos - 1]);
    }

    if (knight.colPos + 1 <= 7) {
      possibleMoves.push([knight.rowPos - 2, knight.colPos + 1]);
    }
  }

  // Traverse Second Row
  if (knight.rowPos - 1 >= 0) {
    if (knight.colPos - 2 >= 0) {
      possibleMoves.push([knight.rowPos - 1, knight.colPos - 2]);
    }

    if (knight.colPos + 2 <= 7) {
      possibleMoves.push([knight.rowPos - 1, knight.colPos + 2]);
    }
  }

  // Traverse Third Row
  if (knight.rowPos + 1 <= 7) {
    if (knight.colPos - 2 >= 0) {
      possibleMoves.push([knight.rowPos + 1, knight.colPos - 2]);
    }

    if (knight.colPos + 2 <= 7) {
      possibleMoves.push([knight.rowPos + 1, knight.colPos + 2]);
    }
  }

  // Traverse Fourth Row
  if (knight.rowPos + 2 <= 7) {
    if (knight.colPos - 1 >= 0) {
      possibleMoves.push([knight.rowPos + 2, knight.colPos - 1]);
    }

    if (knight.colPos + 1 <= 7) {
      possibleMoves.push([knight.rowPos + 2, knight.colPos + 1]);
    }
  }

  possibleMoves.forEach(move => {
    const diffRow = Math.abs(move[0] - coords[0]);
    const diffCol = Math.abs(move[1] - coords[1]);
    const diffTotal = diffRow + diffCol;
    move[2] = diffTotal;
  })

  possibleMoves.sort((a, b) => a[2] - b[2]);

  return possibleMoves;
}

function knightMoves(coords, possibleMoves, movesTaken = []) {
  // Test parameters for coordinates
  if (!Array.isArray(coords) || coords.length !== 2) {
    throw new Error("Invalid Coordinates. Use format [x, y] for coordinates.");
  }

  coords.forEach(coordinate => {
    if (typeof coordinate !== "number" || coordinate < 0 || coordinate > 7) {
      throw new Error("Invalid Coordinates. Enter numbers from 0-7 following the format [x, y] for coordinates.");
    }
  })

  if ([knight.rowPos, knight.colPos] == coords) {
    return movesTaken;
  }
  
  function selectMove (movesList = findMoves(coords), index = 0, path = []) {  
    console.log(movesList); 
    if (index > movesList.length - 1) {
      return null;
    }

    let move = movesList[index];
    if (move[0] == coords[0] && move[1] == coords[1]) {
      knight.rowPos = move[0];
      knight.colPos = move[1];
      path.push([knight.rowPos, knight.colPos]);
      return path;
    }

    // Something wrong with this region.
    if (move[0] == coords[0] || move[1] == coords[1]) {
      selectMove(movesList, index + 1, path)
      return;
    } else {
      path.push([knight.rowPos, knight.colPos]);
      knight.rowPos = move[0];
      knight.colPos = move[1];
      movesList = findMoves(coords);
    }


    return selectMove(movesList, 0, path);
  }

  const shortestPath = selectMove();
  console.log(shortestPath);
}

knightMoves([0, 6]);



/*
  Algorithm:
  1. Take array of possible moves
  2. Find the difference between the possible spaces and the desired Coord
    (a) for example, knight is currently at (5, 5) with the coords at (0, 3). 
        Given a possible space of (3, 4), find the total difference between (3, 4) and (0, 3):
        Such that, difference of x = abs(3 - 0) and difference y = abs(4 - 3). 
        Total difference = diffX + diffY = 3 + 1 = 4;
  3. Find the array with the lowest difference
    (a) test: do NOT go to possible Move if its X or Y coordinates == desired Coords (Infinite Death Loop)
    (b) if it is, choose the next possible Move with the lowest value;
  4. Repeat 1-3 until you reach the coord. 
*/