import express from "express";
import createGame from './handlers/createGame';
import resumeGame from './handlers/findGame';

const router = express.Router();

router.post("game/start/rows/:rows/columns/:columns/mines/:minesQty", createGame);
router.get("/game/resume/:id", resumeGame);
export default router;
