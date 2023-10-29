// Apollo
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';

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
  csrfPrevention: true,
  cache: 'bounded',
  context: () => {
    return { prisma };
  },
  plugins: [
    ApolloServerPluginLandingPageLocalDefault,
    ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
  ],
  logger: console,
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    middleware: [
      async (event) => {
        console.log('###? received event=' + JSON.stringify(event));
      },
    ],
  },
);
