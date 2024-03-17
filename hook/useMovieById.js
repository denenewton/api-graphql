"use client";

import { CRETE_MOVIE_BY_ID, queryData, Axios } from "../utils/cliente";

import { useState } from "react";

const useCreateMovie = () => {
  const [error, setError] = useState("");
  const [payload, setPayload] = useState({ id: "", url_movie: "" });
  const [submitting, setIsSubmitting] = useState(false);

  const createMovie = async (id, url_movie) => {
    try {
      const response = await Axios.post(
        "/graphql",
        queryData(CRETE_MOVIE_BY_ID, {
          id: parseInt(id),
          url_movie,
        })
      );
      const data = await response.data;
      return data.data?.createMovieById;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return {
    error,
    payload,
    setPayload,
    submitting,
    setIsSubmitting,
    createMovie,
  };
};

export default useCreateMovie;
