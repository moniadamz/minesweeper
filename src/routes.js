import express from "express";
import revealCell from "./controllers/revealCell";
import flagCell from "./controllers/flagCell";
import createGame from "./controllers/createGame";
import resumeGame from "./controllers/findGame";

const router = express.Router();

router.post(
  "/game/start/rows/:rows/columns/:columns/mines/:minesQty",
  createGame
);
router.get("/game/resume/:id", resumeGame);
router.patch("/game/:id", revealCell);
router.patch("/game/:id/flag", flagCell);
export default router;
