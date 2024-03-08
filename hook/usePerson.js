import { GET_PERSON_BY_ID, Axios, queryData } from "../utils/cliente";
import { useQuery } from "@tanstack/react-query";

const usePerson = (id) => {
  const fetchData = async () => {
    try {
      const res = await Axios.post(
        "/graphql",
        queryData(GET_PERSON_BY_ID, { id: parseInt(id) })
      );
      const data = await res.data;
      return data?.data?.getPersonById;
    } catch (error) {
      return error;
    }
  };

  return useQuery({
    queryKey: [id],
    queryFn: fetchData,
    staleTime: 60 * 60 * 1000,
  });
};

export default usePerson;
