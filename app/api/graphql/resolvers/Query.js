import {
  filtering,
  getPage,
  getPersonMaped,
  getMovieByTitle,
} from "../../../../utils/utilities";

export const Query = {
  movies: async (
    _,
    { filter = { title: "", genre: "", year: "" } },
    { Movie }
  ) => {
    const { title, genre, year } = filter;
    try {
      const movies = await filtering(title, genre, year, Movie);

      if (movies.length === 0) {
        return [
          {
            __typename: "Error",
            errors: "Sorry, this movie does not exist in our database.",
          },
        ];
      }
      return movies;
    } catch (error) {
      return [
        {
          __typename: "Error",
          errors: error.message,
        },
      ];
    }
  },

  movie: async (_, { id }, { Movie }) => {
    try {
      const movie = await Movie.findOne()
        .and([{ id: id }])
        .select("-date -__v");

      if (!movie) {
        return {
          __typename: "Error",
          errors: "Sorry, this movie does not exist in our database.",
        };
      }
      return movie;
    } catch (error) {
      return {
        __typename: "Error",
        errors: error.message,
      };
    }
  },

  moviesByTitle: async (_, { title }, { Movie }) => {
    try {
      const movie = await getMovieByTitle(title, Movie);

      if (movie.length === 0) {
        return {
          __typename: "Error",
          errors: "Sorry, this film does not exist in our database.",
        };
      }

      return movie[0];
    } catch (error) {
      return {
        __typename: "Error",
        errors: error.message,
      };
    }
  },

  getPage: async (
    _,
    { filter = { title: "", genre: "", year: "" }, page, perPage },
    { Movie }
  ) => {
    const { title, genre, year } = filter;

    try {
      const movies = await filtering(title, genre, year, Movie);
      if (!movies) {
        return {
          __filename: "Error",
          errors: "Sorry, we cannot find anything in our database.",
        };
      }
      const infoPage = getPage(movies, page, perPage);

      return infoPage;
    } catch (error) {
      return {
        __filename: "Error",
        errors: error.message,
      };
    }
  },
  getPersonById: async (_, { id, id_movie }, { Person }) => {
    try {
      const pers = await Person.findOneAndUpdate(
        { id: id },
        { $addToSet: { id_movie: id_movie } },
        { new: true }
      );

      if (pers) return pers;

      const person = await getPersonMaped(id);

      await Person.collection.insertOne({
        ...person,
        id_movie: [id_movie],
      });

      return person;
    } catch (error) {
      return {
        __typename: "Error",
        errors: "Sorry! something goes wrong!, " + error.message,
      };
    }
  },
};
