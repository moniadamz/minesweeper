import * as service from '../services/findGame';

const resumeGame = async (req, res) => {
    const game = await service.findById(req.params.id);
    return res.status(200).json({ game });
}

export default resumeGame;