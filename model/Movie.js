import mongoose, { models } from "mongoose";
import { castMemberSchema } from "./Castmember";
import { genreSchema } from "./Genre";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: [true, "Please enter the movie title"],
  },
  genres: {
    type: [genreSchema],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "This Genre is not valiable",
    },
    required: [true, "Please enter the movie genre"],
  },
  id: {
    type: Number,
    required: [true, "The id of this movie is missing"],
  },
  release_date: {
    type: String,
    trim: true,
    required: [true, "Please enter the movie release date"],
  },
  popularity: {
    type: Number,
  },
  vote_average: {
    type: Number,
  },
  director: {
    type: String,
    trim: true,
    required: [true, "Please enter the movie director"],
  },

  url_image: {
    type: String,
    trim: true,
  },

  backdrop_path: {
    type: String,
    trim: true,
  },

  url_movie: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter the movie description"],
  },
  casts: [castMemberSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Movie = models.Movie || mongoose.model("Movie", Schema);
export default Movie;
