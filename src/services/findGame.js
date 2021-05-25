import Game from "../models/game";

const findById = async (id) => {
  const game = await Game.findById(id).exec();
  if (!game) throw { status: 404, message: "not found!" };
  return game;
};

export { findById };
