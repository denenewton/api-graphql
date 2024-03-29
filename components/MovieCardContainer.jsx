import { Box } from "@chakra-ui/react";

const MovieCardContainer = ({ children }) => {
  return (
    <Box borderRadius={10} overflow={"hidden"}>
      {children}
    </Box>
  );
};

export default MovieCardContainer;
