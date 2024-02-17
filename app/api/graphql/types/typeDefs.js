import gql from "graphql-tag";


const typesDefs = gql`

type Movie {
  id: ID!
  title: String
  genre: Genres
  year: Int
  popularity: Float
  director: String
  urlImage: String
  backdrop_path: String
  urlMovie: String
  description: String
  cast: [Actor]
}

type Info {
  items: [Movie]
  prev: Int
  next: Int
  page: Int
  first: Int
  last: Int
}

type Error {
  message: String
}


interface Person {
  id: ID!
  adult: Boolean
  gender: Int
  known_for_department: String
  name: String
  original_name: String
  popularity: Float
  profile_path: String
  credit_id: String
}

type Actor implements Person {
  id: ID!
  movieID: Int
  adult: Boolean
  gender: Int
  known_for_department: String
  name: String
  original_name: String
  popularity: Float
  profile_path: String
  cast_id: Int
  character: String
  credit_id: String
  order: Int
}

union MoviePayload = Movie | Error


type Query {
  movies(filter: filterMovies): [Movie]
  cast: [Actor!]!
  movie(id: Int): Movie!
  getMovieByTitle(title: String): Movie!
  getMovieByGenre(genre: String): [Movie!]!
  getMovieByYear(year: Int): [Movie!]!
  getPage(filter:filterMovies, page: Int, perPage: Int): Info!
}

type Mutation {
  createMovie(data: MovieInput!): MoviePayload
  updateMovie(id: ID!, data: MovieInput!): MoviePayload
  deleteMovie(id: ID!): MoviePayload

  createCastMovieById(id: ID!):  [Actor]
  createMovieById(id: ID!): MoviePayload
  updateOneCastMember(id: Int!, movieID: Int!, data: ActorInput!): Actor
}


input MovieInput {
    id: ID
    title: String
    genre: String
    year: Int
    popularity: Float
    director: String
    urlImage: String
    backdrop_path: String
    urlMovie: String
    description: String
  }

   input ActorInput {
    id: ID
    movieID: Int
    adult: Boolean
    gender: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
  }

  input filterMovies {
    genre: String
    title: String
    year: Int
  }
  
enum Genres {
  Adventure
  Comedy
  Romance
  Fantasy
  Action
  Thriller
  Drama
  Teen
  Science_Fiction
}

`
export default typesDefs