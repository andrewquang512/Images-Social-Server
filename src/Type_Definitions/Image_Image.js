import gql from 'graphql-tag';

const imageDefs = gql`
  extend type Query {
    allImages: [Image]!
  }

  # extend type Mutation {
  #   createImage(data: CreateImageInput!): Image!
  # }

  type Image {
    id: ID!
    url: String!
    hash: String!
    createdAt: String!

    postId: Post!
    imageInfoId: ImageInfo!
  }
`;

export default imageDefs;
