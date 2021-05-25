import * as service from "../services/flagCell";

const flagCell = async (req, res, next) => {
  try {
    const { row, column } = req.body;
    const game = await service.flagCell(req.params.id, row, column);
    return res.status(200).json({ game });
  } catch (error) {
    next(error);
  }
};

export default flagCell;
