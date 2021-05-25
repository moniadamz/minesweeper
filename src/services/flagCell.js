import Game from "../models/game";
import { findById } from "./findGame";
import * as domain from "../domain/board";

const flagCell = async (id, row, column) => {
  const { board } = await findById(id);
  
  const updatedGame = domain.flagCell(board, row, column);

  await Game.updateOne({ _id: id }, { board: updatedGame }).exec();
  return updatedGame;
};

export { flagCell };
