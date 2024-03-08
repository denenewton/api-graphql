"use client";

import useSearchContext from "../hook/useSearch";
import {
  Heading,
  SimpleGrid,
  Box,
  Spacer,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CardMovies from "../components/CardMovies";
import GridLayout from "../components/GridLayout";
import { usePathname } from "next/navigation";
import useMovies from "../hook/useMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCardContainer from "../components/MovieCardContainer";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import useAuth from "../hook/useAuth";

const page = () => {
  const { searchText, searchGenre } = useSearchContext();
  const { userDoc, currentUser } = useAuth();
  const query = { genre: searchGenre, title: searchText, perPage: 12 };
  const pathname = usePathname();
  const skeletons = [1, 2, 3];
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useMovies(query);

  const fetchMovieCount =
    data?.pages.reduce((total, page) => total + page?.length, 0) || 0;

  return (
    <GridLayout pathname={pathname}>
      <Box
        h="100%"
        pt={1}
        px={"1.7rem"}
        overflowY="auto"
        scrollBehavior="smooth"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <InfiniteScroll
          dataLength={fetchMovieCount}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          endMessage={<Text></Text>}
          loader={<Spinner />}
        >
          <Flex>
            {
              <Heading as="h1" fontSize="4xl" mb={7}>
                {searchGenre === "Science_fiction"
                  ? "Science fiction"
                  : searchGenre === "All Genres"
                  ? "Movies"
                  : searchGenre}
                {!searchGenre && "Movies"}
              </Heading>
            }
            <Spacer />
          </Flex>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            padding="0"
            spacing={4}
          >
            {status === "loading" &&
              skeletons.map((skeleton) => (
                <MovieCardContainer key={skeleton}>
                  <MovieCardSkeleton />
                </MovieCardContainer>
              ))}{" "}
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page?.map((movi) => (
                  <CardMovies
                    key={movi.id}
                    movie={movi}
                    currentUser={currentUser}
                    userDoc={userDoc}
                  />
                ))}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </Box>
    </GridLayout>
  );
};

export default page;
