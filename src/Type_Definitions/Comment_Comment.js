import gql from 'graphql-tag';
import commonDefs from './Common_Common.js'

const commentDefs = gql`
  # extend type Query {
  #   postComments: [Comment]!
  #   userComments: [Comment]!
  # }

  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(data: DeleteCommentInput!): Comment!
    updateComment(data: UpdateCommentInput!): Comment!
    voteComment(data: VoteCommentInput!): Comment!
  }

  extend type Query {
    getCommentsByPostId(data: GetCommentsByPostIdInput, limit: Int, after: String): CommentPagination!
    getCommentsByStoryId(data: GetCommentsByStoryIdInput, limit: Int, after: String): CommentPagination!
  }

  type CommentPagination {
    edges: [CommentEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}
  
  type CommentEdge {
    node: Comment
    cursor: String!
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
    userId: ID!
  }

  input CreateCommentInput {
    content: String!
    userId: ID!
    postId: ID
    storyId: ID
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
    child: [Comment]

    userVoteComment: [String]!
  }
`;

export default commentDefs;
