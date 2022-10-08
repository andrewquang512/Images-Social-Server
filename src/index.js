import { ApolloServer } from "apollo-server";

// Data
// import { PrismaClient, Prisma } from "@prisma/client";
import typeDefs from "./typeDefs.js";
import db from "./data/db.js";

// Resolvers
import Query from "./resolvers/_Query.js";
import Mutation from "./resolvers/_Mutation.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import Comment from "./resolvers/Comment.js";

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
});
