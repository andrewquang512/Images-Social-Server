import gql from 'graphql-tag';

const repCmtDefs = gql`
  extend type Query {
    postComments: [Comment]!
    userComments: [Comment]!
  }

  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    createReplyComment(data: CreateReplyCommentInput!): Comment!
    deleteComment(data: DeleteCommentInput!)
    updateComment(data: UpdateCommentInput!): Comment!
  }

  input CreateCommentInput {
    content: String!
    userId: ID!
    postId: ID!
  }

  input DeleteCommentInput {
    userId: ID!
  }

  input UpdateCommentInput {
    text: String
  }

  type ReplyComment {
    id: ID!
    content: String!

    userId: User!
    postId: Post!
  }
`;

export default repCmtDefs;
