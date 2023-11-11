import gql from 'graphql-tag';

const contestDefs = gql`
  extend type Query {
    allContests: [Contest]!
    contestInfo(data: ContestInfoInput!): Contest!

    contestPosts(contestId: String, after: String): PostConnection!
  }

  input ContestInfoInput {
    contestId: ID!
  }

  input ContestPostsInput {
    contestId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createContest(data: CreateContestInput!): Contest!
    deleteContest(data: DeleteContestInput!): Contest!
    deleteAllContest: DeleteAllReturnType!
  }

  input CreateContestInput {
    name: String!
    contestImageURL: String!
    description: String!

    startDate: String!
    endDate: String!
    prize: String!
  }

  input DeleteContestInput {
    contestId: ID!
  }

  type Contest {
    id: ID!
    name: String!
    contestImageURL: String!
    description: String!

    startDate: String!
    endDate: String!
    prize: String!

    createdAt: String!
    updatedAt: String
  }
`;

export default contestDefs;
