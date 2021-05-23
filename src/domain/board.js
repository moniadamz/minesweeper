const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const setMinesPosition = (minesQty, rows, columns, cells) => {
  let minesSet = 0;

  while (minesSet < minesQty) {
    const posX = getRandomInt(0, rows);
    const posY = getRandomInt(0, columns);

    if (!cells[posX][posY].hasBomb) {
      cells[posX][posY] = { hasBomb: true, isRevealed: false,  isFlagged: false};
      minesSet++;
    }
  }

  return cells;
};

const generateCells = (rowsQty, columnsQty, minesQty) => {
  const cellStructure = {
    hasBomb: false,
    isRevealed: false,
    isFlagged: false
  };
  const rows = [];

  for (let i = 0; i < rowsQty; i++) {
    const columns = [];
    for (let j = 0; j < columnsQty; j++) {
      columns[j] = cellStructure;
    }
    rows[i] = columns;
  }

  const filledCells = setMinesPosition(minesQty, rowsQty, columnsQty, rows);
  return filledCells;
};

const generateGame = (rows, columns, minesQty) => {
  const game = generateCells(rows, columns, minesQty);
  return game;
};

const isSurroundedByBombs = (board, posX, posY, height, width) => {
  let north, south, west, east, northwest, southwest, northeast, southeast;

  if (posY !== 0 && posX < height) {
    south = board[posX][posY - 1];
    southwest = board[posX - 1][posY - 1];
    southeast = board[posX + 1][posY - 1];
  }

  if (posX !== 0 && posY < width) {
    west = board[posX - 1][posY];
    northwest = board[posX - 1][posY + 1];
  }

  if (posY < width) {
    north = board[posX][posY + 1];
  }
  if (posX < height) {
    east = board[posX + 1][posY];
  }

  if (posY < width && posX < height) {
    northeast = board[posX + 1][posY + 1];
  }

  const surroundings = [
    north,
    south,
    west,
    east,
    northwest,
    southwest,
    northeast,
    southeast,
  ];
  const hasBomb = surroundings.filter(
    (item) => item !== undefined && item.hasBomb
  );
  return hasBomb;
};
const flagCell = (board, posX, posY) => {
  const { hasBomb, isRevealed, isFlagged } = board[posX][posY];
  if (!isFlagged && !isRevealed) {
    board[posX][posY] = { hasBomb, isRevealed, isFlagged: true };
  }
  return board;
};

const revealCell = (board, posX, posY, height, width) => {
  console.log(board);
  const { hasBomb, isFlagged } = board[posX][posY];
  if (board[posX][posY].hasBomb) {
    board[posX][posY] = { hasBomb: true, isRevealed: true, isFlagged };
    return { board, message: "game over!" };
  }
  const newAttributes = { hasBomb, isRevealed: true, isFlagged };
  board[posX][posY] = newAttributes;
  const haveBombsAround = isSurroundedByBombs(board, posX, posY);

  if (!haveBombsAround.length) {
    if (posY !== 0 && posX < height) {
      board[posX][posY - 1] = newAttributes;
      board[posX - 1][posY - 1] = newAttributes;
      board[posX + 1][posY - 1] = newAttributes;
    }

    if (posX !== 0 && posY < width) {
      board[posX - 1][posY] = newAttributes;
      board[posX - 1][posY + 1] = newAttributes;
    }

    if (posY < width) {
      board[posX][posY + 1] = newAttributes;
    }
    if (posX < height) {
      board[posX + 1][posY] = newAttributes;
    }

    if (posY < width && posX < height) {
      board[posX + 1][posY + 1] = newAttributes;
    }
  }

  return board;
};

export {
  setMinesPosition,
  generateCells,
  generateGame,
  isSurroundedByBombs,
  revealCell,
  flagCell,
};
