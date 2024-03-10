import { Axios, UPDATE_MOVIE, queryData } from "../utils/cliente";

const useUpdate = () => {
  //const [error, setError] = useState([]);

  const updateMovie = async (id, data) => {
    try {
      const response = await Axios.post(
        "/graphql",
        queryData(UPDATE_MOVIE, { id: parseInt(id), data: data })
      );
      return response.data.data.updateMovie;
    } catch (ex) {
      throw new Error(ex);
    }
  };

  return { updateMovie };
};

export default useUpdate;
