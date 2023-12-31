import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import router from "./route/QuoteRoute.js";
import cors from "cors"
import bodyParser from "body-parser";
const server = express();
dotenv.config()

server.use(cors({
  
  origin: "https://infotrixs-backend.vercel.app"
}
))
server.use(express.json());
server.use(bodyParser.json())


main();
async function main() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .catch((err) => {
      console.log(err);
    });
}

server.get("/",(req,res)=>{
  res.json("hello")
})

// Route related quotes like : fetchng by author, fetching random quote, etc.
server.use("/api", router);

server.listen(process.env.PORT || 8080);
