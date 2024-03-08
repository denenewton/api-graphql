"use client";

import {
  CRETE_MOVIE_BY_ID,
  CREATE_CAST_BY_ID,
  queryData,
  Axios,
} from "../utils/cliente";

import { useState } from "react";

const useCreateMovie = () => {
  const [error, setError] = useState("");
  const [payload, setPayload] = useState({ id: "", urlMovie: "" });
  const [submitting, setIsSubmitting] = useState(false);

  const createAMovie = async (id, url) => {
    try {
      const response = await Axios.post(
        "/graphql",
        queryData(CRETE_MOVIE_BY_ID, {
          id: parseInt(id),
          urlMovie: url || "http://",
        })
      );
      const data = await response.data;
      return data.data?.createMovieById;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const createCast = async (id) => {
    try {
      const response = await Axios.post(
        "/graphql",
        queryData(CREATE_CAST_BY_ID, { id: parseInt(id) })
      );
      const data = await response.data;
      return data.data;
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
    createAMovie,
    createCast,
  };
};

export default useCreateMovie;
