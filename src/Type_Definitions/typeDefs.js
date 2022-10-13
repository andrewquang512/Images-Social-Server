const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    post: Post!
  }

  type Mutation {
    # User
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    # Post
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    # Comment
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  input UpdateCommentInput {
    text: String
  }

  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  # ! Type
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

module.exports = typeDefs;
