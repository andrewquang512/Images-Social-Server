// Apollo
import { ApolloServer } from 'apollo-server';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { WebSocketServer } from 'ws';
// import { useServer } from 'graphql-ws/lib/use/ws';
// Prisma
import { PrismaClient } from '@prisma/client';
// Type definitions and resolvers
import typeDefs from './Type_Definitions/_typeDefs.js';
import resolvers from './resolvers/resolvers.js';
import { loggingPlugin } from './logging.js';

// Connect to MongoDB
export const prisma = new PrismaClient({
  ...(parseInt(process.env.IS_LOGGING) && {
    log: ['query', 'info', 'warn', 'error'],
  }),
});

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

await connectToDatabase();
// The server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { prisma };
  },
  cors: {
    origin: '*', // <- allow request from all domains
    credentials: true, // <- enable CORS response for requests with credentials (cookies, http authentication)
  },
  plugins: [loggingPlugin],
  plugins: [...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : [])],
  logger: console,
  // csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
});
