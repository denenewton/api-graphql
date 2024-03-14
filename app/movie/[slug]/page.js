"use client";

import GridLayout from "../../../components/GridLayout";
import NextLink from "next/link";
import {
  Image,
  Text,
  Link,
  Stack,
  Heading,
  Button,
  createIcon,
  HStack,
  useColorModeValue,
  Flex,
  VStack,
  Box,
} from "@chakra-ui/react";
import useAuth from "../../../hook/useAuth";
import useMovieByTitle from "../../../hook/useMovieByTItle";
import CriticScore from "../../../components/CriticScore";
import ListCast from "../../..//components/ListCast";
import Footer from "../../../components/Footer";

export default function page({ params }) {
  const slug = decodeURI(params.slug);
  const { data } = useMovieByTitle(slug);
  const { userDoc, currentUser } = useAuth();
  const colorDetails = useColorModeValue("gray.50", "gray.700");

  if (data?.errors) return <p className="text-center mt-12">{data?.errors}</p>;

  return (
    <GridLayout pathname={`/movie/${params.slug}`}>
      <Box
        position={"relative"}
        height={{ base: "290px", md: "300px" }}
        mt={"-1rem"}
        boxShadow={"xl"}
        width={"full"}
        overflow={"hidden"}
      >
        <Image
          alt={data?.title}
          fit={{ base: "cover", md: "contain" }}
          align={"center"}
          w={"100%"}
          h={"100%"}
          src={data?.url_image && data?.url_image}
          //borderRadius={"md"}
        ></Image>
      </Box>
      <Box maxW={{ base: "full", md: "85vw" }} mx="auto">
        {data && (
          <Stack
            maxW={"98vw"}
            minH={"78vh"}
            m={"0 auto"}
            mt={".8rem"}
            px={{ base: "1px", md: ".5rem" }}
          >
            <Box width={"full"}>
              {currentUser && userDoc?.authorized ? (
                <Link href={data?.url_movie} target="_blank" rel="noreferrer">
                  <HeadingMovie movieTitle={data?.title} />
                </Link>
              ) : (
                <HeadingMovie movieTitle={data?.title} />
              )}
              <Flex
                rounded={7}
                direction={"column"}
                px={4}
                py={2}
                bg={colorDetails}
                overflow={"hidden"}
              >
                <HStack py={4}>
                  <Text fontWeight={"bold"} mb={0} pb={0}>
                    DETAILS
                  </Text>
                </HStack>
                <HStack
                  justifyContent="space-between"
                  alignItems="stretch"
                  pt={1}
                  pb={2}
                  mt="-1rem"
                >
                  <Flex
                    fontSize="sm"
                    gap={{ sm: "0", lg: "5px" }}
                    direction={{ sm: "column", lg: "row" }}
                  >
                    <Text as={"b"}>Director: </Text>
                    <Text>{data?.director}</Text>
                  </Flex>
                  <Flex
                    fontSize="sm"
                    gap={{ sm: "0", lg: "5px" }}
                    direction={{ sm: "column", lg: "row" }}
                  >
                    <Text as={"b"}>Genre: </Text>
                    <Text>
                      {data?.genres[0].name !== "Science_Fiction"
                        ? data?.genres[0].name
                        : "Science fiction"}
                    </Text>
                  </Flex>
                  <Flex
                    fontSize="sm"
                    mb={2}
                    gap={{ sm: "0", lg: "5px" }}
                    direction={{ sm: "column", lg: "row" }}
                  >
                    <Text as={"b"}>Release Date: </Text>
                    <Text>{data?.release_date}</Text>
                  </Flex>
                  <Flex
                    fontSize="sm"
                    mb={2}
                    gap={{ sm: "0", lg: "5px" }}
                    direction={{ sm: "column", lg: "row" }}
                  >
                    <Text as={"b"}>Popularity: </Text>

                    <CriticScore popularity={data?.popularity} />
                  </Flex>
                </HStack>
                <VStack width={"full"} align={"left"}>
                  <Text fontWeight={"bold"} mb={0}>
                    CAST
                  </Text>
                  <Box width={"full"}>
                    <ListCast idMovie={data?.id} casts={data?.casts} />
                  </Box>
                </VStack>
              </Flex>
            </Box>
            <Box
              width={"full"}
              rounded={7}
              fontSize={"2xl"}
              px={4}
              py={5}
              bg={colorDetails}
            >
              <Text fontWeight={"bold"} mb={1}>
                SINOPSE
              </Text>
              <Text fontSize={"sm"} textAlign="justify">
                {" "}
                {data?.description}
              </Text>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
              pt={5}
              width={"full"}
            >
              {!(currentUser && userDoc?.authorized) && (
                <>
                  <NextLink
                    href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084890fa73b018917b1399202c2"
                    passHref
                  >
                    <Button
                      rounded={"full"}
                      size={"lg"}
                      fontWeight={"normal"}
                      px={6}
                      colorScheme={"red"}
                      bg={"red.400"}
                      _hover={{ bg: "red.500" }}
                    >
                      Upgrade
                    </Button>
                  </NextLink>
                  <NextLink href="/about" passHref>
                    <Button
                      rounded={"full"}
                      size={"lg"}
                      fontWeight={"normal"}
                      px={6}
                      leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
                    >
                      How It Works
                    </Button>
                  </NextLink>
                </>
              )}
            </Stack>
          </Stack>
        )}
      </Box>
      <Footer />
    </GridLayout>
  );
}

const HeadingMovie = ({ movieTitle }) => {
  return (
    <>
      <Heading
        lineHeight={1.1}
        fontWeight={700}
        my={5}
        fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
        textAlign={"center"}
      >
        <Text
          as={"span"}
          position={"relative"}
          _after={{
            content: "''",
            width: "full",
            height: "10%",
            position: "absolute",
            bottom: 0,
            left: 0,
            bg: "gray.500",
            zIndex: -1,
          }}
        >
          {movieTitle}
        </Text>
        <br />
        <Text as={"span"} color={"red.400"}></Text>
      </Heading>
    </>
  );
};

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});
