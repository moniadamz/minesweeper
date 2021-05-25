import moment from "moment";
import Game from "../models/game";
import { findById } from "./findGame";
import * as domain from "../domain/board";

const revealCell = async (id, row, column) => {
  const { board, rows: height, columns: width } = await findById(id);

  if (row > height)
    throw { status: 400, message: "Row number exceeds the limit." };
  if (columns > width)
    throw { status: 400, message: "Column number exceeds the limit." };
  
  const updatedCells = domain.revealCell(board, row, column, height, width);

  let update = { board };

  if (updatedCells.gameOver) {
    update.endedAt = moment();
  }
  const game = await Game.findOneAndUpdate({ _id: id }, update, {
    new: true,
  }).exec();

  return game;
};

export { revealCell };
