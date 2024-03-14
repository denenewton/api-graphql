"use client";
import {
  Button,
  HStack,
  List,
  ListItem,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import useSearchContext from "../hook/useSearch";

const GenreList = () => {
  const genres = [
    "Romance",
    "Fantasy",
    "Comedy",
    "Thriller",
    "Family",
    "Teen",
    "TV Movie",
    "Mystery",
    "Action",
    "Drama",
    "Crime",
    "Adventure",
    "Science Fiction",
    "All Genres",
  ];
  const { searchGenre, setSearchGenre } = useSearchContext();
  const { colorMode } = useColorMode();

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
                fontSize="md"
                color={colorMode === "dark" ? "#fff" : "#444"}
                variant="link"
              >
                {genre}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
