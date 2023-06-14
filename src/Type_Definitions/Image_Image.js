import gql from 'graphql-tag';

const imageDefs = gql`
  extend type Query {
    allImages: [Image]!
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

    postId: Post!
    imageInfoId: ImageInfo!
  }
`;

export default imageDefs;
