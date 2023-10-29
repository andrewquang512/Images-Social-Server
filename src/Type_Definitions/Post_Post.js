import gql from 'graphql-tag';

const postDefs = gql`
  extend type Query {
    allPosts: [Post]!
    postInfo(data: PostInfoInput!): Post!

    getNewFeed(userId: String, after: String, timeCall: Int): PostConnection!
    getAllUserPosts(
      userId: String
      currentUserId: String
      after: String
    ): PostConnection!

    searchQuery(data: SearchQueryInput!): SearchReturnType!

    similarImages(data: SimilarImagesInput!): [Image]!
  }

  input SimilarImagesInput {
    postId: ID!
  }

  input SearchQueryInput {
    userId: ID!
    searchString: String!
  }

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

  enum ViewStatus {
    PUBLIC
    ONLY_FOLLOWERS
    PRIVATE
  }

  input CreatePostInput {
    userId: ID!

    title: String!
    caption: String!
    postViewStatus: ViewStatus!

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
    # caption: String
    postViewStatus: Boolean
  }

  type Post {
    id: ID!
    title: String!
    caption: String!
    createdAt: String!
    updatedAt: String!
    postViewStatus: ViewStatus!
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
