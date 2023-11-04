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
    getCommentsByPostId(data: GetCommentsByPostIdInput): CommentPagination!
    getCommentsByStoryId(data: GetCommentsByStoryIdInput): CommentPagination!
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
    limit: Int
    after: String
  }

  input GetCommentsByStoryIdInput {
    storyId: ID!
    limit: Int
    after: String
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
