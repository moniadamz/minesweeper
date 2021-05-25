import * as service from "../services/createGame";

const createGame = async (req, res, next) => {
  try {
    const { rows, columns, minesQty } = req.params;

    const gameId = await service.createGame(rows, columns, minesQty);

    return res.status(201).json({ gameId });
  } catch (error) {
    next(error);
  }
};

export default createGame;
