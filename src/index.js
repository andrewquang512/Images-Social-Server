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

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
// Websocket
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';

// Firebase notification
import admin from 'firebase-admin';
import { googleApplicationCredentials } from './constants.js';

admin.initializeApp({
  credential: admin.credential.cert(googleApplicationCredentials),
  databaseURL:
    'https://noti-flens-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const firebaseMessaging = admin.messaging();
// console.log({ firebaseMessaging });

// Web socket
const pubsub = new PubSub();

export { pubsub };

export async function bootstrap(port) {
  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/

  const app = express();
  const httpServer = http.createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: () => {
      return { prisma };
    },
    introspection: true,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ...(parseInt(process.env.IS_LOGGING) ? [loggingPlugin] : []),
      ApolloServerPluginDrainHttpServer({ httpServer }),
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
  });

  await server.start();

  app.use('/', cors(), express.json(), expressMiddleware(server));

  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`);
  });
}

bootstrap(4000);
