import Joi from "joi";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TOKEN_API_MOVIE,
  },
};

////////////////GET//MOVIE//BY//ID//URL_MOVIE//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getMovieMaped(id, url_movie) {
  const url = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";
  var movie = new Object();

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    movie = {
      id: json.id,
      title: json.original_title,
      genres: json.genres,
      release_date: json.release_date,
      popularity: json.popularity,
      vote_average: json.vote_average,
      description: json.overview,
      director: json.production_companies[0].name || "null",
      backdrop_path: "https://image.tmdb.org/t/p/original" + json.backdrop_path,
      url_image: "https://image.tmdb.org/t/p/w500" + json.backdrop_path,
      url_movie: url_movie ,
    };
  } catch (ex) {
    console.log("getMovieMaped: ", ex.message);
    throw new Error(ex);
  }

  return movie;
}
///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
export async function getCastMamberMaped(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  try {
    const res = await fetch(url, options);

    const json = await res.json();
    let cast = await json["cast"].filter((c) => c.profile_path !== null);
    cast = await cast.map((cast) => {
      if (!cast.character) return;

      return {
        ...cast,
        profile_path: "https://image.tmdb.org/t/p/original" + cast.profile_path,
      };
    });

    return cast;
  } catch (ex) {
    console.log("getCastMamberMaped: ", ex.message);
    throw new Error("getCastMamberMaped: There is no movie with this id," + ex);
  }
}
////////////////GET//PAGES//DOES//PAGINATION///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export function getPage(array, page, perPage) {
  const obj = new Object();
  const start = (page - 1) * perPage; // start == offset
  const end = page * perPage;

  obj.items = array.slice(start, end);
  if (obj.items.length === 0) {
    return obj;
  }

  if (page > 1) {
    obj.prev = page - 1;
  }

  if (end < array.length) {
    obj.next = page + 1;
  }

  if (obj.items.length !== array.length) {
    obj.page = page; //current or page
    obj.first = 1;
    obj.last = Math.ceil(array.length / perPage);
  }

  return obj;
}
////////////////FILTERING MOVIES///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function filtering(title = "", genre = "", year = "", Movie) {
  try {
    let movies = await Movie.find()
      .and([
        {
          title: { $regex: title, $options: "i" },
          release_date: { $regex: year, $options: "i" },
          "genres.name": { $regex: genre, $options: "i" },
        },
      ])
      .sort("title")
      .select("-casts -__v -date");
    //.countDocuments();
    return movies;
  } catch (ex) {
    throw new Error(ex);
  }
}
///////////////CREATE//MOVIE//WITH//CAST///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function createMovieWithCastMambers(movie, casts, Movie) {
  try {
    const _movie = new Movie({ ...movie, casts: casts });
    const result = await _movie.save();
    return result;
  } catch (ex) {
    console.log("createMovieWithCastMambers: ", ex.message);
    throw new Error(ex);
  }
}
////////////////CREATE//MOVIE//BY//ID///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function createMovieById(id, url_movie, Movie) {
  if(!url_movie) return new Error('Url of the movie is missing...')
  try {
    const exists = await Movie.findOne({ id: id });
    if (exists) {
      return {
        __typename: "Error",
        errors: "Sorry, this movie already exists in our database.",
      };
    }
    const casts = await getCastMamberMaped(id);
    const movie = await getMovieMaped(id, url_movie);
    const result = await createMovieWithCastMambers(movie, casts, Movie);

    return result;
  } catch (ex) {
    throw new Error(ex);
  }
}
////////////////GET//PERSON//BY//ID///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getPersonMaped(id) {
  const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
  var person = new Object();

  const res = await fetch(url, options);
  const json = await res.json();
  const profile_path =
    "https://image.tmdb.org/t/p/original" + json.profile_path;
  person = {
    ...json,
    profile_path: profile_path,
  };

  return person;
}
////////////////GET//MOVIE//BY//TITLE//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getMovieByTitle(title, Movie) {
  const gender = [1, 2];
  const popularity = 10;
  return await Movie.aggregate([
    { $match: { title: { $regex: title, $options: "i" } } },
    { $sort: { title: 1 } },
    {
      $addFields: {
        casts: {
          $filter: {
            input: "$casts",
            as: "cast",
            cond: {
              $and: [
                { $in: ["$$cast.gender", gender] },
                { $gte: ["$$cast.popularity", popularity] },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        id: 1,
        title: 1,
        director: 1,
        release_date: 1,
        popularity: 1,
        url_image: 1,
        url_movie: 1,
        description: 1,
        backdrop_path: 1,
        "genres.id": 1,
        "genres.name": 1,
        "casts.id": 1,
        "casts.name": 1,
        "casts.character": 1,
        "casts.popularity": 1,
        "casts.profile_path": 1,
      },
    },
  ]);
}
///////////////SCHEMA//UPDATE//MOVIE//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export const schemaUpdateMovie = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  director: Joi.string().min(3).max(50).required(),
  release_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/, "numbers")
    .required()
    .error(new Error("release_date must be this pattern yyyy-mm-dd")),
  description: Joi.string().min(5).required(),
  url_movie: Joi.string().min(8).required(),
});
