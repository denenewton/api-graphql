export default function getPage(array, page, perPage) {
  const obj = {};
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

export async function filtering(filter, Movie) {
  let movies;
  if (filter) {
    if (filter?.title) {
      movies = await Movie?.find({
        title: { $regex: filter?.title, $options: "i" },
      });
      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      if (filter?.genre) {
        const regex = new RegExp(filter?.genre, "i");
        movies = movies.filter((mov) => mov.genre?.match(regex));
      }
      return movies;
    }
    if (filter?.genre) {
      movies = await Movie?.find({
        genre: { $regex: filter?.genre, $options: "i" },
      });

      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      return movies;
    }
    if (filter.year) {
      movies = await Movie?.find({ year: filter?.year });
      return movies;
    }
  }
  movies = await Movie?.find();
  return movies;
}

export  const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM4NTBkMjg3NTkxN2UwODgwNzVkYTJiYWQ2MjY1ZSIsInN1YiI6IjYzMGVhN2Y5ZDdhNzBhMDA5Mjk5NGFmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u8lj5BX7AfegFWeUORKenyjAs0bFLYn_-KE3Wk61cM",
  },
};