import gql from 'graphql-tag';

const userDefs = gql`
  extend type Query {
    allUsers: [User]!
    userInfo(data: UserInfoInput!): User!
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(data: DeleteUserInput!): User!
    deleteAllUser()
    updateUser(id: ID!, data: UpdateUserInput!): User!
  }

  input UserInfoInput {
    userId: ID!
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

  input DeleteUserInput {
    userId: ID!
  }

  input UpdateUserInput {
    userId: ID!
    name: String
    profileImageURL: String
    email: String
    hashPassword: String
    phoneNumber: String
    age: Int
    birthday: String
  }

  
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
