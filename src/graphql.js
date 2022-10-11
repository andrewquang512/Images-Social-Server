// import { ApolloServer, gql } from "apollo-server-lambda";
// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

// // Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => "Hello world!",
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   csrfPrevention: true,
//   cache: "bounded",
//   plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
// });

// // const graphqlHandler = server.createHandler();
// export default server.createHandler();

const { ApolloServer, gql } = require("apollo-server-lambda");

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "cặc",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

exports.graphqlHandler = server.createHandler();
