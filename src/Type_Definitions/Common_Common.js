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
    checkSimilarPosts(
      post1Id: String
      post2Id: String
    ): checkSimilarPostsDetails!
  }

  input hashImageWithPostIdsInput {
    postIds: [String]
  }

  type checkSimilarPostsDetails {
    isSimilar: Boolean
    post1Imageurl: String
    post2ImageUrl: String
  }
`;

export default commonDefs;
