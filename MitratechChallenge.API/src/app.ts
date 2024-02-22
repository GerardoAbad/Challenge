import express from "express";
import { productRoutes } from "./routes";
import { json } from "body-parser";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:3000"],
};

const app = express().use(cors(corsOptions)).use(json()).use(productRoutes);

app.listen(3000, () => {
  return console.log("My Node App listening on port 3000");
});
