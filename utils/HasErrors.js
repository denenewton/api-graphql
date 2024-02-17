export function hasErrosMovie(data) {
    if(verifyRequiredFields(data)) return verifyRequiredFields(data)
  
    if (verifyIdField(data.id)) return verifyIdField(data.id);
  
    if(verifyGenreField(data.genre)) return verifyGenreField(data.genre)
  
    if (verifyYearField(data.year)) return verifyYearField(data.year)
      
    return false;
  }
  
  export function verifyYearField(year){
    var onlyNumbers = new RegExp("^[0-9]+$");
    if (onlyNumbers.test(year)) {
      const date = new Date();
      if (year < 1985 || year > date.getFullYear()) {
        return {
          __typename: "Error",
          message: "Year need to be [1985 - 2023].",
        };
      }
    }
  }
  
  
  export  function verifyRequiredFields(data){
    if (
      !data.title ||
      !data.year ||
      !data.genre ||
      !data.director ||
      !data.description
    ) {
      return {
        __typename: "Error",
        message:
          "This field is required:  title, year, genre, director, description.",
      };
    }
  }
  
  export function verifyIdField(id) {
    var onlyNumbers = new RegExp("^[0-9]+$");
    if (!onlyNumbers.test(id)) {
      return {
        __typename: "Error",
        message:
          "This ID is invalid! it needs to contain only numbers [0 - 9] with no signal!!",
      };
    }
    return false;
  }
  
  export function verifyGenreField(genre) {
    const genres = [
      "Adventure",
      "Comedy",
      "Romance",
      "Fantasy",
      "Action",
      "Thriller",
      "Drama",
      "Teen",
      "Science_Fiction",
    ];
  
    if (!genres.find((g) => g === genre)) {
      return {
        __typename: "Error",
        message:
          "Genre just can be one of these: Adventure,  Comedy,  Romance, Fantasy,  Action,  Thriller, Drama, Teen, Science_Fiction",
      };
    }
  }
  
  export async function verifyUniqueFields(Movie, data) {
    const id = await Movie.findOne({ id: data?.id });
    const title = await Movie.findOne({ title: data?.title });
  
    if (id && title) {
      return {
        __typename: "Error",
        message: "This movie already exists try another one!!",
      };
    }
  
    if (id) {
      return {
        __typename: "Error",
        message: "This ID already exists try another one!!",
      };
    }
    if (title) {
      return {
        __typename: "Error",
        message: "This title already exists try another one!!",
      };
    }
  }
  
  export async function ifMovieExists(Movie, id, title) {
    const mov = await Movie.findOne({ id: id });
      const mov_title = await Movie.findOne({ title: title });
  
      if (!mov) {
        return {
          __typename: "Error",
          message: "Sorry! this movie doesn't exisist!!",
        };
      }
  
      if (mov_title) {
        if (Number(mov_title?.id) === Number(id)) {
          return {
            __typename: "Error",
            message: "It's the same title you had before, try another one!!",
          };
        }
        return {
          __typename: "Error",
          message: "This title aldeary exisist try another one!!",
        };
      }
  }
  
  export function payloadToSend(_movie) {
    delete _movie["_doc"]._id;
    delete _movie["_doc"].__v;
  
    var payload = _movie["_doc"];
  
    return {
      __typename: "Movie",
      ...payload,
    };
  }
  

  