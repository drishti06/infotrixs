import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import router from "./route/QuoteRoute.js";
import cors from "cors"
import bodyParser from "body-parser";
const server = express();
dotenv.config()
server.use(express.json());
server.use(cors())
server.use(bodyParser.json())
server.use(express.static(process.env.DIST_DIR))

main();
async function main() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .catch((err) => {
      console.log(err);
    });
}

// Route related quotes like : fetchng by author, fetching random quote, etc.
server.use("/", router);

server.listen(process.env.PORT);