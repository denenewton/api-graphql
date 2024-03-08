"use client";
import { Button, HStack, List, ListItem, Heading } from "@chakra-ui/react";
import useSearchContext from "../hook/useSearch";

const GenreList = () => {
  const genres = [
    "Science_Fiction",
    "Comedy",
    "Thriller",
    "Romance",
    "Fantasy",
    "Teen",
    "TV_Movie",
    "Family",
    "Mystery",
    "Action",
    "Drama",
    "Adventure",
    "Crime",
    "All Genres",
  ];
  const { searchGenre, setSearchGenre } = useSearchContext();

  return (
    <>
      <Heading fontSize="2xl" marginTop={10} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {genres.map((genre, index) => (
          <ListItem key={index} paddingY="5px">
            <HStack>
              <Button
                fontWeight={genre === searchGenre ? "bold" : "normal"}
                onClick={() => setSearchGenre(genre)}
                fontSize="lg"
                variant="link"
              >
                {genre === "Science_Fiction"
                  ? "Science Fiction"
                  : genre === "TV_Movie"
                  ? "TV Movie"
                  : genre}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
