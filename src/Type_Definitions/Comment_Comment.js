import gql from 'graphql-tag';

const commentDefs = gql`
  # extend type Query {
  #   postComments: [Comment]!
  #   userComments: [Comment]!
  # }

  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(data: DeleteCommentInput!): Comment!
    updateComment(data: UpdateCommentInput!): Comment!
    voteCommand(data: VoteCommentInput!): Comment!
  }

  extend type Query {
    getCommentsByPostId(data: GetCommentsByPostIdInput): [Comment]!
    getCommentsByStoryId(data: GetCommentsByStoryIdInput): [Comment]!
  }

  input GetCommentsByPostIdInput {
    postId: ID!
  }
  input GetCommentsByStoryIdInput {
    storyId: ID!
  }

  enum voteCommentAction {
    UPVOTE
    DOWNVOTE
  }

  input VoteCommentInput {
    commentId: ID!
    action: voteCommentAction!
  }

  input CreateCommentInput {
    content: String!
    userId: ID!
    postId: ID!
    storyId: ID!
    parentCommentId: ID
  }

  input DeleteCommentInput {
    commentId: ID!
  }

  input UpdateCommentInput {
    commentId: ID!
    content: String!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: String!

    userId: User!
    postId: Post!
    storyId: Story!

    votes: Int!
    children: [Comment]
  }
`;

export default commentDefs;
