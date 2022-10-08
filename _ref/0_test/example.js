// example.js
const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
let port = 3000;

/* Đây là ví dụ schema đã được khởi tạo */

let schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

// Root provides a resolver function for each API endpoint
let root = {
  postTitle: () => {
    return "Build a Simple GraphQL Server With Express and NodeJS";
  },
  blogTitle: () => {
    return "scotch.io";
  },
};

const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //Set to false if you don't want graphiql enabled
  })
);

app.listen(port);
console.log("GraphQL API server running at localhost:" + port);
