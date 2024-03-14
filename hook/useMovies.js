import { GUET_PAGE, queryData, Axios } from "../utils/cliente";
import { useInfiniteQuery } from "@tanstack/react-query";

const useMovies = (query) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const _genre = query.genre;
    const res = await Axios.post(
      "/graphql",
      queryData(GUET_PAGE, {
        filter: {
          genre: _genre !== "All Genres" ? _genre : "",
          title: query.title,
        },
        page: pageParam,
        perPage: query?.perPage,
      })
    );

    return res.data?.data?.getPage?.items;
  };
  return useInfiniteQuery({
    queryKey: query && ["movies", query],
    queryFn: fetchData,
    staleTime: 60 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.length === 12 ? allPages?.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useMovies;
