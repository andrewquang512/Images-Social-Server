import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';

const storyDefs = gql`
  extend type Query {
    allStories: [Story]!
    storyInfo(data: StoryInfoInput!): Story!
    getNewStories(limit: Int, after: String): StoryConnection!
    getAllUserStories(
      userId: String
      currentUserId: String
      after: String
    ): StoryConnection!
  }

  type StoryConnection {
    edges: [StoryEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}

  type StoryEdge {
    node: Story
    cursor: String!
  }

  input StoryInfoInput {
    storyId: ID!
  }

  extend type Mutation {
    createStory(data: CreateStoryInput!): Story!
    deleteStory(data: DeleteStoryInput!): Story!
    deleteAllStory: DeleteAllReturnType!
    updateStory(data: UpdateStoryInput!): Story!
    interactStory(data: InteractStoryInput!): Story!

    reportedStory(data: ReportStoryInput!): Story!
  }

  input CreateStoryInput {
    userId: ID!
    title: String!
    storyViewStatus: ViewStatus!
    content: String!
    images: [String]!
    categoryId: [String]
    tag: [String]
  }

  input DeleteStoryInput {
    storyId: ID!
  }

  input UpdateStoryInput {
    storyId: ID!
    title: String
    content: String
  }

  input InteractStoryInput {
    storyId: ID!
    likedUserId: ID!
    isLiked: Boolean!
  }

  input ReportStoryInput {
    storyId: ID!
    userId: ID!
  }

  type Story {
    id: ID!
    title: String!
    storyViewStatus: ViewStatus!

    createdAt: String!
    updatedAt: String!
    content: String!
    points: Int!

    tag: [String]!
    categoryId: [Category]!

    images: [String]!
    comments: [Comment]!

    userId: User!

    userLikedStory: [String]!
    reportedUserIds: [String]!
  }
`;

export default storyDefs;
