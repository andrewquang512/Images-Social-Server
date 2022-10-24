// Apollo
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// Prisma
import { PrismaClient } from '@prisma/client';
// Type definitions and resolvers
import typeDefs from './Type_Definitions/_typeDefs.js';
import resolvers from './resolvers/resolvers.js';

// Connect to MongoDB
const prisma = new PrismaClient();

// The server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma },
  // csrfPrevention: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server ready at: ${url}`);
