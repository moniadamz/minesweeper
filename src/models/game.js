import mongoose from "mongoose";

const schema = mongoose.Schema;

const boardSchema = new schema({
  hasBomb: Boolean,
  isRevealed: Boolean,
  isFlagged: Boolean,
});

const gameSchema = new schema({
  board: [[boardSchema]],
  rows: Number,
  columns: Number,
});

export default mongoose.model("game", gameSchema);
