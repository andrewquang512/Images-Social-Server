import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';

const userDefs = gql`
  extend type Query {
    allUsers: [User]!
    userInfo(data: UserInfoInput!): User!
    verifyUser(data: VerifyUserInput!): User!
    suggestUserToFollow(
      data: SuggestUserToFollowInput!
      limit: Int
      after: String
    ): UserPagination!
  }

  type UserPagination {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}

  type UserEdge {
    node: User
    cursor: String!
  }

  input VerifyUserInput {
    hashPassword: String!
    email: String!
  }

  input SuggestUserToFollowInput {
    userId: ID!
  }

  input UserInfoInput {
    userId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(data: DeleteUserInput!): User!
    deleteAllUser: DeleteAllReturnType!
    updateUser(data: UpdateUserInput!): User!
  }

  input CreateUserInput {
    name: String!
    profileImageURL: String
    backgroundImageURL: String
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
    backgroundImageURL: String
    email: String
    hashPassword: String
    phoneNumber: String
    age: Int
    birthday: String
  }

  type User {
    id: ID!
    isAdmin: Int!
    email: String!
    hashPassword: String!
    name: String!
    age: Int!
    birthday: String!
    phoneNumber: String!
    profileImageURL: String!
    backgroundImageURL: String!
    createdAt: String!
    updatedAt: String

    level: Level!
    posts: [Post]!
    stories: [Story]!
    albums: [Album]!
  }
`;

export default userDefs;
