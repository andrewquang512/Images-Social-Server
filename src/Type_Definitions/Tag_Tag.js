import gql from 'graphql-tag';

const tagDefs = gql`
  extend type Query {
    allTags: Tag
    tagInfo(data: TagInfoInput!): Tag!
  }

  input TagInfoInput {
    tagId: ID!
  }

  extend type Mutation {
    createTag(data: CreateTagData!): Tag!
    # deleteComment(data: DeleteCommentInput!): Comment!
    # updateComment(data: UpdateCommentInput!): Comment!
  }

  input CreateTagData {
    name: String!
  }

  # input DeleteCommentInput {
  #   cmtId: ID!
  # }

  # input UpdateCommentInput {
  #   cmtId: ID!
  #   content: String!
  # }

  type Tag {
    id: ID!
    name: String!
    postIDs: [Post]!
  }
`;

export default tagDefs;
