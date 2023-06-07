import gql from 'graphql-tag';

const userDefs = gql`
  extend type Query {
    userInfo(data: UserInfoInput!): User!
    allUsers: [User!]!
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    # deleteUser(id: ID!): User!
    # updateUser(id: ID!, data: UpdateUserInput!): User!
  }

  input UserInfoInput {
    id: ID!
  }

  input CreateUserInput {
    name: String!
    profileImageURL: String
    email: String!
    hashPassword: String!
    phoneNumber: String
    age: Int
    birthday: String
  }

  # input UpdateUserInput {
  #   name: String
  #   email: String
  #   age: Int
  # }

  # input userInfo {
  #   userID: String!
  # }

  type User {
    id: ID!
    email: String!
    hashPassword: String!
    name: String!
    age: Int!
    birthday: String!
    phoneNumber: String!
    profileImageURL: String!
    createdAt: String!
    updatedAt: String

    level: Level!
    posts: [Post]!
    stories: [Story]!
  }
`;

export default userDefs;
