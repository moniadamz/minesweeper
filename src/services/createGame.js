import moment from "moment";
import { generateGame } from "../domain/board";
import Game from '../models/game';

const save = async (board, rows, columns) => {
  const newGame = new Game({ board, rows, columns, startedAt: moment(), endedAt: null });
  return newGame.save();
};

const createGame = async (rows, columns, minesQty) => {
  const game = generateGame(rows, columns, minesQty);
  const { _id } = await save(game, rows, columns);
  return _id;
};

export { createGame };