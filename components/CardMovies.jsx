import Link from "next/link";
import { Card, CardBody, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import buildUrl from "../services/buildUrl";
import CircularProgressBar from "./CircularProgressBar";
const CardMovies = ({ movie, userDoc, currentUser }) => {
  const url = buildUrl(movie?.title.toString());

  return (
    <Card key={movie?.id} overflow="hidden">
      <Image
        src={movie?.url_image}
        alt={movie?.title}
        objectFit="cover"
        backgroundPosition="center"
      />
      <CircularProgressBar rating={movie?.vote_average.toFixed(1)} />
      <CardBody mt="-10px">
        <Link href={`/movie/${url}`}>
          <Text fontSize={"2xl"} fontWeight={600} pl={0} ml="-5px">
            {movie?.title}
          </Text>
        </Link>
        <Flex alignItems="center">
          {" "}
          <Text fontSize="14.7px" fontWeight={500} pl={0} ml="-5px">
            {movie?.release_date}
          </Text>
          <Spacer />
          {currentUser && userDoc?.authorized && (
            <Link href={"/update/" + movie.title}>
              <Text>
                <EditIcon
                  color={"gray.400"}
                  fontSize={"14px"}
                  _hover={{ color: "gray.900" }}
                />
              </Text>
            </Link>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardMovies;
