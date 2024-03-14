import { GET_PERSON_BY_ID, Axios, queryData } from "../utils/cliente";
import { useQuery } from "@tanstack/react-query";

const usePerson = (id, id_movie) => {
  const fetchData = async () => {
    try {
      const res = await Axios.post(
        "/graphql",
        queryData(GET_PERSON_BY_ID, {
          id: id,
          id_movie: id_movie,
        })
      );
      const data = await res.data;
      return data?.data?.getPersonById;
    } catch (error) {
      return error;
    }
  };

  return useQuery({
    queryKey: [id, id_movie],
    queryFn: fetchData,
    staleTime: 60 * 60 * 1000,
  });
};

export default usePerson;
