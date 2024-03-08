import { GUET_MOVIES_BY_TITLE, Axios, queryData } from "../utils/cliente";
import { useQuery } from "@tanstack/react-query";

const useMovieByTitle = (title) => {
  const fetchData = async () => {
    try {
      const res = await Axios.post(
        "/graphql",
        queryData(GUET_MOVIES_BY_TITLE, { title: title?.toString() })
      );
      const data = await res.data;
      return data?.data?.moviesByTitle;
    } catch (error) {
      return error;
    }
  };

  return useQuery({
    queryKey: [title],
    queryFn: fetchData,
    staleTime: 60 * 60 * 1000,
  });
};

export default useMovieByTitle;
