import serviceCreateGame from "../services/createGame";

const createGame = async (req, res, next) => {
  const { rows, columns, minesQty } = req.params;

  const gameId = await serviceCreateGame(rows, columns, minesQty);

  return res.status(200).json({ gameId });
};

export default createGame;
