import Game from "../models/game";
import findById from './findGame';
import * as domain from '../domain/board';

const revealCell = async (id, row, column) => {
    const { board } = await findById(id);
    const updatedGame = domain.revealCell(board, row, column, )
    return Game.updateOne({ id }, ).exec();
};

export { revealCell };
