import { generateGame } from "../domain/board";
import Game from '../models/game';

const save = async (board, rows, columns) => {
  const newGame = new Game({ board, rows, columns });
  return newGame.save();
};

const createGame = async (rows, columns, minesQty) => {
  const game = generateGame(rows, columns, minesQty);
  const { _id } = await save(game);
  return _id;
};

export default createGame;