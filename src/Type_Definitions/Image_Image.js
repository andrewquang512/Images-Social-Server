import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';

const imageDefs = gql`
  extend type Query {
    allImages: [Image]!
    getImageById(id: String!): Image!
  }

  # extend type Mutation {
  #   # createImage
  #   deleteAllImage: DeleteAllReturnType!
  # }

  type Image {
    id: ID!
    url: String!
    hash: String!
    createdAt: String!
    updatedAt: String!

    postConnection: Post!
    imageInfoId: ImageInfo!
  }
`;

export default imageDefs;
