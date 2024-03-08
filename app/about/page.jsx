"use client";

import {
  Container,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import GridLayout from "../../components/GridLayout";
import NextLink from "next/link";
import useAuth from "../../hook/useAuth";
import Footer from "../../components/Footer";

export default function Index() {
  const { userDoc, currentUser } = useAuth();
  const bgButtonUpdate = useColorModeValue(
    "linear(to-l, #7928CA, #FF0080)",
    "linear(to-l, #FF0080, #7928CA)"
  );
  const colorButtonUpdate = useColorModeValue("white", "black");
  return (
    <GridLayout title={"how works"}>
      <Container mt={0} alignItems="center" minH={"80.5vh"} pt={1}>
        <Stack mt={"33%"}>
          <Heading>
            <Text
              bgGradient="linear(to-l, #222, gray.300)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              Get access to our single plan!
            </Text>
          </Heading>
          <br />
          <Text>
            To watch movies you need access through our unique plan. Our single
            plan costs only 5.00 BRL. This site is for anyone who wants to
            improve their English by listening to lots of movies in English. If
            you enjoy watching movies with original sound spoken by the original
            actors, then this plan is for you.
          </Text>
          {!(currentUser && userDoc.authorized) && (
            <NextLink
              href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084890fa73b018917b1399202c2"
              passHref
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                mt={4}
                bgGradient={bgButtonUpdate}
                color={colorButtonUpdate}
                _hover={{ bg: "gray.500" }}
              >
                Upgrade
              </Button>
            </NextLink>
          )}
        </Stack>
      </Container>
      <Footer />
    </GridLayout>
  );
}
