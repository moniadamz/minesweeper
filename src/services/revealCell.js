import Game from "../models/game";
import { findById } from './findGame';
import * as domain from '../domain/board';

const revealCell = async (id, row, column) => {
    const { board, rows: height, columns: width } = await findById(id);
    const updatedGame = domain.revealCell(board, row, column, height, width);
    
    await Game.updateOne({ _id: id }, { board: updatedGame }).exec();

    return updatedGame;
};

export { revealCell };
