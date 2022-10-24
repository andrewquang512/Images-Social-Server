// Apollo
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Type definitions
import typeDefs from './Type_Definitions/_typeDefs.js';

// Resolvers
import Query from './resolvers/Query/_Query.js';
import Mutation from './resolvers/Mutation/_Mutation.js';
import Subcription from './resolvers/Subcription/_Subcription.js';
import Type from './resolvers/Type/_Type.js';

// Prisma
import { PrismaClient } from '@prisma/client';

// Resolvers
const resolvers = {
  Query,
  Mutation,
  // Subcription,
  ...Type,
};

// Connect to MongoDB
const prisma = new PrismaClient();
export { prisma };

// The server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma },
  csrfPrevention: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server ready at: ${url}`);
