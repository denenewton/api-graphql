import { Mutation } from "./Mutation";
import { Movie, Query } from "./Query";
import { MoviePayload } from "./__resolverTypes";

export default {
  Movie: {...Movie },
  Query: { ...Query },
  Mutation: { ...Mutation },
  MoviePayload: {...MoviePayload },
};
