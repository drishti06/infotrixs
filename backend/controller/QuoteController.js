import Quotes from "../model/QuoteModel.js";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

// Controller to fetch from external API and store it in database
export const quotesController = async (req, res) => {
  const quotesApi = await axios.get("https://zenquotes.io/api/quotes");
  try {
    for (let i = 1; i < 50; i++) {
      const quote_and_author = quotesApi.data.map((item) => ({
        quote: item.q,
        author: item.a,
      }));
      const createQuote = await Quotes.create({
        quote: quote_and_author[i].quote,
        author: quote_and_author[i].author,
      });
      await createQuote.save();
    }
  } catch (error) {
    res.status(500).json({ ErrorInSavindData: error });
  }
};

// Fetching any random quote from all quotes
export const fetchQuote = async (req, res) => {
  try {
    const allQuotes = await Quotes.find();
    const length = allQuotes.length;
    const randomIndex = Math.floor(Math.random() * length);
    const randomQuote = allQuotes[randomIndex];
    res.status(200).json(randomQuote);
  } catch (error) {
    res.status(500).json({ ErrorInFetchingRandomQuote: error });
  }
};

// Fetching all quotes by particular author name
export const findByAuthor = async (req, res) => {
  const authorName = req.body.author;
  try {
    const findAuthor = await Quotes.find({ author: authorName });
    res.status(200).json(findAuthor);
  } catch (error) {
    res.status(500).json({ ErrorInFetchingByAuthorName: error });
  }
};

// Fetching all author name
export const fetchAllAuthors = async (req, res) => {
  try {
    const allAuthors = await Quotes.distinct("author");
    res.status(200).json(allAuthors);
  } catch (error) {
    res.status(500).json({ ErrorInFetchingAllAuthors: error });
  }
};
