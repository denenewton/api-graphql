import {
  List,
  ListItem,
  Card,
  Image,
  CardBody,
  Heading,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import CriticScore from "./CriticScore";
import Link from "next/link";

const ListCast = ({ casts }) => {
  return (
    <Box w={"100%"} overflowY={"hidden"} overflowX={"auto"}>
      <List display={"flex"} gap={1} flexDir={"row"} scrollBehavior={"smooth"}>
        {casts?.map((p, index) => (
          <React.Fragment key={index}>
            {p?.profile_path && (
              <ListItem key={p.id}>
                <Card key={p.name} overflow="hidden" w={"155px"}>
                  <Image
                    src={p.profile_path.replace("/original", "/w185")}
                    alt={p.name}
                    width="100%"
                    objectFit={"cover"}
                    height={"165px"}
                    // maxH={{ sm: "335px", md: "24=50px", lg: "170px", xl: "165px" }}
                  />
                  <Link href={"/person/" + p?.id}>
                    <CardBody>
                      <Box>
                        <Heading fontSize={"12px"}>{p.name}</Heading>
                      </Box>

                      <HStack justifyContent="space-between">
                        <Text fontSize={12}>Popularity</Text>
                        <CriticScore popularity={p.popularity} />
                      </HStack>
                    </CardBody>
                  </Link>
                </Card>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ListCast;
