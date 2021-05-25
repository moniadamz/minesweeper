import * as service from "../services/revealCell";

const revealCell = async (req, res, next) => {
  try {
    const { row, column } = req.body;
    const game = await service.revealCell(req.params.id, row, column);
    return res.status(200).json({ game });
  } catch (error) {
    next(error);
  }
};

export default revealCell;
