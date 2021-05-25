require('dotenv').config();

import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import routes from "./src/routes";
import errorHandler from "./src/middlewares/errorHandler";

const app = express();
const port = process.env.PORT || "8080";

app.use(json({ type: "application/*+json" }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`App running on port ${port}`));
  })
  .catch((err) => console.log("ERRO", err));
