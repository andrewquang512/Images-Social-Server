import gql from 'graphql-tag';

const postDefs = gql`
  extend type Query {
    allPosts: [Post]!
    postInfo(data: PostInfoInput!): Post!
    getNewFeed(userId: String, after: String): PostConnection!
  }

  # input NewFeedInput {
  #   userId: ID
  #   begin: String
  #   after: String
  # }

  type PostConnection {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }

  type PostEdge {
    node: Post
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  #

  input PostInfoInput {
    postId: ID!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(data: DeletePostInput!): Post!
    deleteAllPost: DeleteAllReturnType!
    updatePost(data: UpdatePostInput!): Post!
    interactPost(data: InteractPostInput!): Post!
  }

  input CreatePostInput {
    userId: ID!

    title: String!

    imageURL: String!
    imageHash: String!

    categoryId: [String]
    albumId: [String]
    tag: [String]

    camera: String
    lens: String
    aperture: String
    focalLength: String
    shutterSpeed: String
    ISO: String
    takenWhen: String
    copyRight: String
  }

  input DeletePostInput {
    postId: ID!
  }

  input InteractPostInput {
    postId: ID!
    likedUserId: ID!
    isLiked: Boolean!
  }

  # !!!!!!
  input UpdatePostInput {
    postId: ID!
    title: String
    body: String
  }

  type Post {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    points: Int!

    tag: [String]!
    albumId: [Album]!
    categoryId: [Category]!

    userId: User!
    comments: [Comment]!
    image: Image!

    userLikedPost: [String]!
  }
`;

export default postDefs;
