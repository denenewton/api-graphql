import { createYoga, createSchema } from "graphql-yoga";
import Castmember from "../../../model/Castmember";
import conn from "../../../utils/connectMongo"
import typesDefs from "./types/typeDefs";
import Movie from "../../../model/Movie";
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
  context: { Castmember, Movie },
  graphqlEndpoint: "/api/graphql",
  cors: "*",
  fetchAPI: { Response },
});


export { yogaApp as GET, yogaApp as POST }