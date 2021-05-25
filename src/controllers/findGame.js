import * as service from "../services/findGame";

const resumeGame = async (req, res, next) => {
  try {
    const game = await service.findById(req.params.id);
    return res.status(200).json({ game });
  } catch (error) {
    next(error);
  }
};

export default resumeGame;
