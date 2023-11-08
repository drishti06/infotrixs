import express from "express";
import {
  quotesController,
  findByAuthor,
  fetchAllAuthors,
  fetchQuote,
} from "../controller/QuoteController.js";

const router = express.Router();

router
  .post("/createQuote", quotesController) // route to store in database
  .post("/authorQuotes", findByAuthor) // route to fetch quote by author name
  .get("/quoteOfDay", fetchQuote) // route to fetch random quote from all quotes
  .get("/authors", fetchAllAuthors); // route to fetch all author names

export default router;
