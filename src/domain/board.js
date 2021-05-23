const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const setMinesPosition = (minesQty, rows, columns, cells) => {
  let minesSet = 0;

  while (minesSet < minesQty) {
    const posX = getRandomInt(0, rows);
    const posY = getRandomInt(0, columns);

    if (!cells[posX][posY].hasBomb) {
      cells[posX][posY] = { hasBomb: true, isRevealed: false };
      minesSet++;
    }
  }

  return cells;
};

const generateCells = (rowsQty, columnsQty, minesQty) => {
  const cellStructure = {
    hasBomb: false,
    isRevealed: false,
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

const revealCell = (board, posX, posY, height, width) => {
  if (board[posX][posY].hasBomb) {
    board[posX][posY] = { hasBomb: true, isRevealed: true };
    return { board, message: "game over!" };
  }

  board[posX][posY] = { hasBomb: false, isRevealed: true };
  const hasBomb = isSurroundedByBombs(board, posX, posY);

  if (!hasBomb.length) {
    if (posY !== 0 && posX < height) {
      board[posX][posY - 1] = { hasBomb: false, isRevealed: true };
      board[posX - 1][posY - 1] = { hasBomb: false, isRevealed: true };
      board[posX + 1][posY - 1] = { hasBomb: false, isRevealed: true };
    }

    if (posX !== 0 && posY < width) {
      board[posX - 1][posY] = { hasBomb: false, isRevealed: true };
      board[posX - 1][posY + 1] = { hasBomb: false, isRevealed: true };
    }

    if (posY < width) {
      board[posX][posY + 1] = { hasBomb: false, isRevealed: true };
    }
    if (posX < height) {
      board[posX + 1][posY] = { hasBomb: false, isRevealed: true };
    }

    if (posY < width && posX < height) {
      board[posX + 1][posY + 1] = { hasBomb: false, isRevealed: true };
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
};
