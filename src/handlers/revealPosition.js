import * as service from "../services/revealCell";

const resumeGame = async (req, res) => {
    const { row, column } = req.body;
  const game = await service.revealCell(req.params.id, row, column);
  return res.status(200).json({ game });
};

export default resumeGame;
