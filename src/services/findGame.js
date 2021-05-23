import Game from '../models/game';

const findById = async (id) => {
    return Game.findById(id).exec();
};

export { findById };