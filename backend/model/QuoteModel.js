import mongoose from "mongoose";
import { Schema } from "mongoose";

const quoteSchema = Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
const Quotes = mongoose.model("quotes", quoteSchema);

export default Quotes;
