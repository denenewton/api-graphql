import mongoose, { models } from "mongoose";

const Schema = mongoose.Schema({
  
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
  },
  director: {
    type: String,
    required: true,
  },
  urlImage: {
    type: String,
  },
  
  backdrop_path: {
   type: String,
  },

  urlMovie: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});


const Movie = models.Movie || mongoose.model("Movie", Schema);
export default Movie;
