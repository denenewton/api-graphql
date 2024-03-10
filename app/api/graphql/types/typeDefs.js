import { gql } from "graphql-tag";

const typeDefs = gql`
  interface Midia {
    _id: ID
    title: String!
    release_date: String!
    description: String!
  }

  type Movie implements Midia {
    _id: ID
    id: Int
    title: String!
    genres: [Genre]
    release_date: String!
    popularity: Float
    director: String
    url_image: String
    url_movie: String
    description: String!
  }

  type MovieAndCast implements Midia {
    _id: ID
    id: Int!
    title: String!
    genres: [Genre]
    release_date: String!
    popularity: Float
    director: String!
    url_image: String
    backdrop_path: String
    url_movie: String
    description: String!
    casts: [Actor]
  }

  enum Genres {
    Adventure
    Comedy
    Romance
    Fantasy
    Family
    Action
    Thriller
    Drama
    Teen
    Science_Fiction
    TV_Movie
    Mystery
    Crime
  }

  type Genre {
    _id: ID
    id: Int
    name: Genres
  }

  input GenreInput {
    id: Int
    name: Genres
  }

  input MovieInput {
    id: Int
    title: String!
    genres: [GenreInput]
    release_date: String!
    popularity: Float
    director: String
    url_image: String
    url_movie: String
    description: String!
  }

  interface Character {
    _id: ID
    name: String
    original_name: String
    popularity: Float
    profile_path: String
  }

  type Actor implements Character {
    _id: ID
    id: Int!
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

  type Person {
    adult: Boolean
    also_known_as: [String]
    biography: String
    birthday: String
    deathday: String
    gender: Int
    homepage: String
    id: Int
    imdb_id: String
    known_for_department: String
    name: String
    place_of_birth: String
    popularity: Float
    profile_path: String
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
    errors: String
  }

  union MoviePayload = Movie | Error

  union MovieAndCastPayload = MovieAndCast | Error

  union InfoPayload = Info | Error

  union PersonPayload = Person | Error

  input filterMovies {
    genre: String
    title: String
    year: String
  }

  type Query {
    movies(filter: filterMovies): [MoviePayload]
    movie(id: Int!): MovieAndCastPayload
    moviesByTitle(title: String): MovieAndCastPayload
    getPage(filter: filterMovies, page: Int, perPage: Int): InfoPayload
    getPersonById(id: Int!): PersonPayload
  }
  type Mutation {
    createMovieById(id: Int!, url_movie: String): MovieAndCastPayload
    updateMovie(id: Int!, data: MovieInput!): MoviePayload
  }
`;

export default typeDefs;
