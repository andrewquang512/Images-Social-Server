const { ApolloServer } = require('apollo-server-lambda');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

// Data
// import { PrismaClient, Prisma } from "@prisma/client";
const typeDefs = require('./typeDefs.js');
const db = require('./data/db.js');

// Resolvers
const Query = require('./resolvers/_Query.js');
const Mutation = require('./resolvers/_Mutation.js');
const Subcription = require('./resolvers/_Subcription.js');
const User = require('./resolvers/User.js');
const Post = require('./resolvers/Post.js');
const Comment = require('./resolvers/Comment.js');

// Provide resolver functions for your )schema fields
const resolvers = {
  Query,
  Mutation,
  // Subcription,
  User,
  Post,
  Comment,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

exports.graphqlHandler = server.createHandler();
