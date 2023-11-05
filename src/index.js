// Apollo
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Prisma
import { prisma } from './prisma/database.js';

// Type definitions and resolvers
import typeDefs from './Type_Definitions/_typeDefs.js';
import resolvers from './resolvers/resolvers.js';
import { loggingPlugin } from './logging.js';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { prisma };
  },
  introspection: true,
  cors: {
    origin: '*', // <- allow request from all domains
    credentials: true, // <- enable CORS response for requests with credentials (cookies, http authentication)
  },
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
  ],
  logger: console,
  // csrfPrevention: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
