import gql from 'graphql-tag';

const tagDefs = gql`
  # extend type Query {
  #   postComments: [Comment]!
  #   userComments: [Comment]!
  # }

  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(data: DeleteCommentInput!): Comment!
    updateComment(data: UpdateCommentInput!): Comment!
  }

  input CreateCommentInput {
    content: String!
    userId: ID!
    postId: ID!
  }

  input DeleteCommentInput {
    cmtId: ID!
  }

  input UpdateCommentInput {
    cmtId: ID!
    content: String!
  }

  type Tag {
    id: ID!
    content: String!

    userId: User!
    postId: Post!
  }
`;

export default tagDefs;
