import {
  createMovieById,
  schemaUpdateMovie,
} from "../../../../utils/utilities";

export const Mutation = {
  createMovieById: async (_, { id, url_movie }, { Movie }) => {
    if(!url_movie) return new Error('Url of the movie is missin...')
    var movie = new Object();

    try {
      movie = await createMovieById(id, url_movie, Movie);

      return movie;
    } catch (ex) {
      return {
        __typename: "Error",
        errors: ex.message,
      };
    }
  },

  updateMovie: async (_, { data, id }, { Movie }) => {
    try {
      const { error } = schemaUpdateMovie.validate(data);

      if (error) {
        throw new Error(error);
      }
      var movie = await Movie.findOneAndUpdate({ id: parseInt(id) }, data, {
        new: true,
      });
      if (!movie) {
        throw new Error("movie does not exists in our database.");
      }

      return movie;
    } catch (ex) {
      console.log(ex.message);
      return {
        __typename: "Error",
        errors: ex.message,
      };
    }
  },
};
