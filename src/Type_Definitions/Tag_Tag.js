import gql from 'graphql-tag';

const tagDefs = gql`
  extend type Query {
    allTags: [Tag]!
    suggestTags: [Tag]!
    tagInfo(data: TagInfoInput!): Tag!
  }

  input TagInfoInput {
    tag: String!
  }

  extend type Mutation {
    createTag(data: CreateTagData!): [Tag]!
    deleteAllTag: DeleteAllReturnType!
  }

  input CreateTagData {
    name: [String]!
  }

  type Tag {
    id: ID!
    name: String!
    posts: [Post]!
  }
`;

export default tagDefs;
