import { useState } from "react";
import { Axios, UPDATE_MOVIE, queryData } from "../utils/cliente";

const useUpdate = () => {
  const [error, setError] = useState([]);

  const updateMovie = async (id, data) => {
    await Axios.post(
      "/graphql",
      queryData(UPDATE_MOVIE, { id: parseInt(id), data: data })
    )
      .then((res) => console.log(res.data))
      .catch((err) => setError(err));
  };

  return { updateMovie, error };
};

export default useUpdate;
