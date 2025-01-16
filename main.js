function findMoves([a, b], [x, y]) {
  let moves = [
    [a - 2, b - 1],
    [a - 2, b + 1],
    [a - 1, b - 2],
    [a - 1, b + 2],
    [a + 1, b - 2],
    [a + 1, b + 2],
    [a + 2, b - 1],
    [a + 2, b + 1],
  ];

  const validMoves = moves
    .filter(
      (move) => move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7
    )
    .map((move) => {
      const diffX = Math.abs(move[0] - x);
      const diffY = Math.abs(move[1] - y);
      const distance = Math.sqrt(diffX**2 + diffY**2);
      const distanceRounded = Math.round(distance * 100) / 100;
      return [...move, distanceRounded];
    })
    .sort((a, b) => a[2] - b[2]);

  return validMoves;
}

function findShortedPath([a, b], [x, y], movesList, index = 0, path = [[a, b]]) {
  let currPos = [a, b];

  if (a === x && b === y) {
    return path;
  }

  let move = movesList[index];
  console.log(movesList);
  const pathStringified = JSON.stringify(path);
  const exists = pathStringified.includes([move[0], move[1]]);

  if (!exists && move[2] !== 1) {
    currPos = move.slice(0, 2);
    path.push(currPos);
    movesList = findMoves(currPos, [x, y]);
    index = 0;
  } else {
    index++;
  }

  return findShortedPath(currPos, [x, y], movesList, index, path);

}

async function knightMoves([a, b], [x, y]) {
  const movesList = findMoves([a, b], [x, y]);
  const path =  findShortedPath([a, b], [x, y], movesList);
  console.log(`Shortest Path from ${[a, b]} to ${[x, y]}: ${path.length - 1} moves.`);
  console.log(" ");
  console.log("Moves: Coords")
  for (let i = 0; i < path.length; i++) {
    console.log(`    ${i}:  ${path[i]}`);
  }
}

const test = knightMoves([4, 0], [3, 5]);