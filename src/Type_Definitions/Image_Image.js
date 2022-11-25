import gql from 'graphql-tag';

const imageDefs = gql`
  extend type Query {
    allImages: [Image!]!
  }

  extend type Mutation {
    createImage(data: CreateImageInput!): Image!
  }

  input CreateImageInput {
    url: String!
    hash: String!
  }

  type Image {
    id: ID!
    url: String!
    hash: String!
    createdAt: String!
  }
`;

export default imageDefs;
