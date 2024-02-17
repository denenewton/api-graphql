import {
  verifyIdField,
  hasErrosMovie,
  ifMovieExists,
  payloadToSend,
  verifyUniqueFields,
} from "../../../../utils/HasErrors"


export const Mutation = {
  createMovie: async (_, { data }, { Movie }) => {
    if (hasErrosMovie(data)) return hasErrosMovie(data);

    if (await verifyUniqueFields(Movie, data))
      return await verifyUniqueFields(Movie, data);

    const _movie = await Movie.create(data);
    if (_movie) return payloadToSend(_movie);
  },

  updateMovie: async (_, { data, id }, { Movie }) => {
    if (verifyIdField(id)) return verifyIdField(id);

    if(await ifMovieExists(Movie, id, data?.title)) 
    return  await ifMovieExists(Movie, id, data?.title)
    

    if (data?.id) {
      return {
        __typename: "Error",
        message: "Sorry! id fields cannot be updated.",
      };
    }

    var movie = await Movie.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
    });

    return payloadToSend(movie);
  },

  deleteMovie: async (_, { id }, { Movie }) => {
    if (verifyIdField(id)) return verifyIdField(id);

    const movie = await Movie.findOneAndDelete({ id: Number(id) });

    if (!movie) {
      return {
        __typename: "Error",
        message: "Sorry! this movie doesn't exisist!!",
      };
    }

    if (movie) return payloadToSend(movie);
  },

  //CREATE CAST PEOPLE
  createCastMovieById: async (_, { id }, {Castmember }) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=633850d2875917e088075da2bad6265e`;
    const res = await fetch(url, options);
    const json = await res.json();
    const _cast = await json["cast"].map(mov => {
       if(!mov.character) return;
        return {
        movieID: parseInt(id),
        ...mov,
        }
    });
    // REMOV EL NULL
    const cast = await _cast.filter( c => c)
   
    await Castmember.insertMany(cast);
    //console.log(cast);
    return cast;
  },

  createMovieById: async (_, { id }, { Movie }) => {
    var movie = new Object();
    const url = "https://api.themoviedb.org/3/movie/" + id;
    const res = await fetch(url, options);
    const json = await res.json();

    let year = json.release_date?.split("-");
    movie.id = json.id;
    movie.title = json.original_title;
    movie.genre = json.genres[0].name || json.genres[1].name;
    movie.year = Number(year[0]);
    movie.popularity = json.popularity;
    movie.description = json.overview;
    movie.director = "null";
    movie.backdrop_path =
      "https://image.tmdb.org/t/p/original" + json.backdrop_path;
    movie.urlImage = "https://image.tmdb.org/t/p/w500" + json.backdrop_path;
    movie.urlMovie = "https://drive.google.com/file/d/";

    if (await verifyUniqueFields(Movie, movie))
      return await verifyUniqueFields(Movie, movie);

    const _movie = await Movie.create(movie);
    if (_movie) return payloadToSend(_movie);
  },

  updateOneCastMember: async (_, { id, movieID, data }, { Castmember }) => {
    const res = await Castmember.findOneAndUpdate({ id, movieID }, data, {
      new: true,
    });
    return res;
  },

};
