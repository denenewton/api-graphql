import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const clientReactQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
    },
  },
});

const headers = {
  "content-type": "application/json",
  Authorization: "",
};

export const Axios = axios.create({
  baseURL: "http://localhost:3000/api/", //"https://api-graphql-kappa.vercel.app/api/",
  method: "post",
  headers: headers,
});

export const queryData = (QUERY, variables) => {
  return {
    query: QUERY,
    variables,
  };
};

export const GUET_PAGE = `
query ($filter: filterMovies,$page:Int!,$perPage:Int!) {
  getPage(filter:$filter, page:$page,perPage:$perPage) {
    ...on Info{
    page
    first
    last
    next
    prev
    items {
      id
      title
      director
      release_date
      popularity
      vote_average
      description
      url_image
      url_movie
      genres {
        id
        name
      }
    }
  }
  ... on Error {
    errors
  }
 }
}
`;

export const GUET_MOVIES_BY_TITLE = `
  query($title: String!) {
    moviesByTitle(title: $title) {
      ... on MovieAndCast {
      id
      title
      genres {        
        name
      }
      director
      release_date
      popularity
      vote_average
      description
      url_image
      url_movie
      casts{
        id
        name
        character
        popularity
        profile_path
      }
    }
    ... on Error {
      errors
    }
   }
  }
  `;

export const CRETE_MOVIE_BY_ID = `
mutation  CreateMovieById($id:Int!, $urlMovie:String) {
  createMovieById(id:$id, url_movie:$urlMovie){
    ... on MovieAndCast {
      id
      title
      genres {
        name
      }
      director
      description
      popularity
      release_date
      url_image
      url_movie
    }
    ...on Error{
      errors
    }
  }
}
`;

export const GET_PERSON_BY_ID = `
query MyQuery($id: Int! , $id_movie: Int!) {
  getPersonById(id: $id, id_movie: $id_movie) {
    ... on Person {
      id
      name
      also_known_as
      biography
      birthday
      known_for_department
      place_of_birth
      popularity
      profile_path
      homepage
    }
    ... on Error {
      errors
    }
  }
}
`;

export const UPDATE_MOVIE = ` 
  mutation($id: Int!, $data: MovieInput!) {
    updateMovie(id: $id, data: $data) {
    ...on Movie{
      id 
      title
      release_date
      popularity
      director
      description
      
    }
    ... on Error {
      errors
    }
  }
}`;
