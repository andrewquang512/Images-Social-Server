import gql from 'graphql-tag';
import commonDefs from './Common_Common.js'

const imageDefs = gql`
  extend type Query {
    allImages: [Image]!
    exploreImages(data: ExploreImagesInput): ImagePagination!
  }

 type ImagePagination {
    edges: [ImageEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}
  
  type ImageEdge {
    node: Image
    cursor: String!
  }
  
  # extend type Mutation {
  #   # createImage
  #   deleteAllImage: DeleteAllReturnType!
  # }

  input ExploreImagesInput{
    categoryId: String!
    limit: Int
    after: String
  }

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
