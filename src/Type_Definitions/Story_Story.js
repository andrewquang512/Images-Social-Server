import gql from 'graphql-tag';

const storyDefs = gql`
  extend type Query {
    allStories: [Story]!
    storyInfo(data: StoryInfoInput!): Story!
    getNewStories(limit: Int, after: String): StoryConnection!
  }

  type StoryConnection {
    edges: [StoryEdge!]!
    pageInfo: PageInfo!
  }

  type StoryEdge {
    node: Story
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
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
  }

  input CreateStoryInput {
    userId: ID!
    title: String!
    content: String!
    images: [String]!
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

  type Story {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    content: String!
    points: Int!

    images: [String]!
    comments: [Comment]!

    userId: User!

    userLikedStory: [String]!
  }
`;

export default storyDefs;
