// Apollo
const { ApolloServer } = require('apollo-server-lambda');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

// Type definitions
// const typeDefs = require('./Type_Definitions/_typeDefs.js');

// Resolvers
const Query = require('./resolvers/Query/_Query.js');
const Mutation = require('./resolvers/Mutation/_Mutation.js');
const Subcription = require('./resolvers/Subcription/_Subcription.js');
const Type = require('./resolvers/Type/_Type.js');

// Resolvers
// const resolvers = {
//   Query,
//   Mutation,
//   // Subcription,
//   ...Type,
// };

// Connect to MongoDB
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.prisma;

// Delete Later
const { gql } = require('apollo-server-lambda');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// The server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// Handler for serverless
exports.graphqlHandler = server.createHandler();
// 3x50gqLn1pnA
