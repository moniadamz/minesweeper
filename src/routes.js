import express from "express";
import revealCell from "./controllers/revealCell";
import flagCell from "./controllers/flagCell";
import createGame from "./controllers/createGame";
import resumeGame from "./controllers/findGame";

import { validation } from "./middlewares/validator";

const router = express.Router();

router.post("/game/start", validation.validateCreateGame, createGame);
router.get("/game/resume/:id", resumeGame);
router.patch("/game/:id", validation.validateRevealCell, revealCell);
router.patch("/game/:id/flag", validation.validateRevealCell, flagCell);
export default router;
