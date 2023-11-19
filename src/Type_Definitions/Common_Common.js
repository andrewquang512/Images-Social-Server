import gql from 'graphql-tag';

const commonDefs = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  extend type Mutation {
    hashImageWithPostIds(data: hashImageWithPostIdsInput): String!
  }

  input hashImageWithPostIdsInput {
    postIds: [String]
  }
`;

export default commonDefs;
