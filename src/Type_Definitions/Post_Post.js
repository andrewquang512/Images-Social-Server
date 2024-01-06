import gql from 'graphql-tag';
import tagDefs from './Tag_Tag.js';
import userDefs from './User_User.js';
import commonDefs from './Common_Common.js';

const postDefs = gql`
  extend type Query {
    allPosts: [Post]!
    allPostsTimestamp: [Static]!
    postInfo(data: PostInfoInput!): Post!

    getNewFeed(
      userId: String
      categoryIds: [String]
      after: String
      timeCall: Int
    ): PostConnection!

    getAllUserPosts(
      userId: String
      currentUserId: String
      after: String
    ): PostConnection!

    searchQuery(data: SearchQueryInput!): SearchReturnType!
    searchResult(data: SearchQueryInput!): SearchReturnType!

    explorePosts(
      data: ExplorePostsInput
      limit: Int
      after: String
    ): PostPagination!
    similarPosts(
      data: SimilarPostsInput!
      limit: Int
      after: String
    ): PostPagination!
  }

  type PostPagination {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}

  type Static {
    month: String
    year: String
  }

  type PostEdge {
    node: Post
    cursor: String!
  }

  input ExplorePostsInput {
    categoryIds: [String]
  }

  type SearchReturnType {
    tags: [Tag]!
    users: [User]!
  }
  ${tagDefs}
  ${userDefs}

  type SearchReturnType {
    tags: [Tag]!
    users: [User]!
    posts: [Post]!
    stories: [Story]!
  }

  input SimilarPostsInput {
    postId: String!
  }

  input SearchQueryInput {
    userId: ID!
    searchString: String!
  }

  type PostConnection {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
    timeCall: Int!
  }
  ${commonDefs}

  type PostEdge {
    node: Post
    cursor: String!
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

    reportedPost(data: ReportPostInput!): Post!
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
    contestId: String!
    postViewStatus: ViewStatus!

    imageURL: String!

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

  input ReportPostInput {
    postId: ID!
    userId: ID!
  }

  input UpdatePostInput {
    postId: ID!

    postViewStatus: ViewStatus

    title: String
    caption: String

    camera: String
    lens: String
    aperture: String
    focalLength: String
    shutterSpeed: String
    ISO: String
    takenWhen: String
    copyRight: String
  }

  type Post {
    id: ID!

    title: String!
    caption: String!
    contestId: String

    postViewStatus: ViewStatus!
    points: Int!

    createdAt: String!
    updatedAt: String!

    tag: [String]!
    albumId: [Album]!
    categoryId: [Category]!

    userId: User!
    comments: [Comment]!
    image: Image!

    userLikedPost: [String]!
    reportedUserIds: [String]!
  }
`;

export default postDefs;
