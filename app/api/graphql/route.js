import { createYoga, createSchema } from "graphql-yoga";
import conn from "../../../utils/connectMongo";
import typesDefs from "./types/typeDefs";
import Movie from "../../../model/Movie";
import Person from "../../../model/Person";
import resolvers from "./resolvers";

(async function () {
  await conn();
})();

const schema = createSchema({
  typeDefs: typesDefs,
  resolvers: resolvers,
});

const yogaApp = createYoga({
  schema,
  context: { Movie, Person },
  graphqlEndpoint: "/api/graphql",
  //cors: "*",
  fetchAPI: { Response },
});

export { yogaApp as GET, yogaApp as POST };
