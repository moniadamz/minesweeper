import Game from "../models/game";
import { findById } from "./findGame";
import * as domain from "../domain/board";

const flagCell = async (id, row, column) => {
  const { board, rows: height, columns: width, endedAt } = await findById(id);

  if (endedAt) throw { status: 400, message: "This game is already over." };
    if (row > height)
      throw { status: 400, message: "Row number exceeds the limit." };
  if (column > width)
    throw { status: 400, message: "Column number exceeds the limit." };

  const updatedGame = domain.flagCell(board, row, column);

  await Game.updateOne({ _id: id }, { board: updatedGame }).exec();
  return updatedGame;
};

export { flagCell };
