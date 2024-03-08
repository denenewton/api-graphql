import mongoose from "mongoose";

export const genreSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Adventure",
      "Comedy",
      "Romance",
      "Fantasy",
      "Family",
      "Action",
      "Thriller",
      "Drama",
      "Teen",
      "Science_Fiction",
      "TV_Movie",
      "Mystery",
      "Crime",
    ],
  },
});
