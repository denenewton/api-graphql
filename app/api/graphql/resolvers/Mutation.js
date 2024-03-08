import { createMovieById } from "../../../../utils/utilities";

export const Mutation = {
  createMovieById: async (_, { id, url_movie }, { Movie }) => {
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
};
