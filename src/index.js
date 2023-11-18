// Apollo
import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Prisma
import { prisma } from './prisma/database.js';

// Type definitions and resolvers
import typeDefs from './Type_Definitions/_typeDefs.js';
import resolvers from './resolvers/resolvers.js';
import { loggingPlugin } from './logging.js';

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export { pubsub };

export async function bootstrap() {
  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   context: () => {
  //     return { prisma };
  //   },
  //   introspection: true,
  //   cors: {
  //     origin: '*', // <- allow request from all domains
  //     credentials: true, // <- enable CORS response for requests with credentials (cookies, http authentication)
  //   },
  //   plugins: [
  //     ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  //     ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
  //   ],
  //   logger: console,
  //   // csrfPrevention: true,
  // });

  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });

  // console.log(`Server ready at: ${url}`);

  //!!!!!!!!!!!!!!!!!!
  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/

  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    // path: '/subscriptions',
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema,
    context: () => {
      return { prisma };
    },
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    logger: console,
    // csrfPrevention: true,
  });

  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/',
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server),
  );

  httpServer.listen(4000, () => {
    console.log(`Server is now running on http://localhost:4000`);
  });
}

bootstrap();
