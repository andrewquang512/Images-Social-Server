// Apollo
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';
// Prisma
import { prisma } from './prisma/database.js';
import cors from 'cors';
// Type definitions and resolvers
import typeDefs from './Type_Definitions/_typeDefs.js';
import resolvers from './resolvers/resolvers.js';
import { loggingPlugin } from './logging.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: () => {
    return { prisma };
  },
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
  ],
  logger: console,
});

const corsMiddleware = async (event) => {
  const origin = event.headers.origin;
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) {
    // return callback(null, true);
    return;
  }

  const localhostRegex = /^http:\/\/localhost(?::\d{1,5})?$/;
  const allowedOrigins = [
    'https://develop.d3rhlz96rgdfbq.amplifyapp.com',
    'https://flens.website',
  ];

  if (localhostRegex.test(origin)) {
    // Allow requests from localhost
    // callback(null, );
    return;
  }
  if (allowedOrigins.indexOf(origin) !== -1) {
    // Allow requests from localhost
    // callback(null, );
    return;
  } else {
    // Block requests from other origins
    // callback(new Error('Not allowed by CORS'));
    // return false;
    throw new Error('Not allowed by CORS');
  }
};

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    middleware: [
      async (event) => {
        console.log('###? received event=' + JSON.stringify(event));
        const origin = event.headers.origin;
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
          // return callback(null, true);
          return;
        }

        const localhostRegex = /^http:\/\/localhost(?::\d{1,5})?$/;
        const allowedOrigins = [
          'https://develop.d3rhlz96rgdfbq.amplifyapp.com',
          'https://flens.website',
        ];

        if (localhostRegex.test(origin)) {
          // Allow requests from localhost
          // callback(null, );
          return;
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
          // Allow requests from localhost
          // callback(null, );
          return;
        } else {
          // Block requests from other origins
          // callback(new Error('Not allowed by CORS'));
          // return false;
          throw new Error('Not allowed by CORS');
        }
      },
    ],
  },
);
