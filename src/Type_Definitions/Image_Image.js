import gql from 'graphql-tag';

const imageDefs = gql`
  extend type Query {
    allImages: [Image!]!
  }

  extend type Mutation {
    createImage(data: CreateImageInput!): Image!
    # deleteUser(id: ID!): User!
    # updateUser(id: ID!, data: UpdateUserInput!): User!
  }

  input CreateImageInput {
    url: String!
    hash: String!
  }

  type Image {
    id: ID!
    url: String!
    hash: String!
  }
`;

export default imageDefs;
