import gql from 'graphql-tag';

const contestDefs = gql`
  extend type Query {
    allContests: [Contest]!
    contestInfo(data: ContestInfoInput!): Contest!
    getTopPostContest(data: ContestInfoInput!): [Post]!

    contestPosts(
      contestId: String
      userId: String
      after: String
    ): PostConnection!
  }

  input ContestInfoInput {
    contestId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createContest(data: CreateContestInput!): Contest!
    deleteContest(data: DeleteContestInput!): Contest!
    deleteAllContest: DeleteAllReturnType!

    userJoinContest(data: UserJoinContestInput!): Contest!
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

  input UserJoinContestInput {
    contestId: ID!
    userId: ID!
  }

  type Contest {
    id: ID!
    name: String!
    contestImageURL: String!
    description: String!

    startDate: String!
    endDate: String!
    prize: String!
    userJoined: [String]

    createdAt: String!
    updatedAt: String
  }
`;

export default contestDefs;
