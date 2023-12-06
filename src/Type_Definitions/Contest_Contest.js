import gql from 'graphql-tag';

const contestDefs = gql`
  extend type Query {
    allContests: [Contest]!
    contestInfo(data: ContestInfoInput!): Contest!
    contestPosts(
      data: ContestPostsInpout
      limit: Int
      after: String
    ): PostConnection!
    getTopContestPosts(contestId: String, top: Int!): [Post]!
    # getContestPrizes
    # getPrizes
    # getContestPostScore
  }

  input ContestPostsInpout {
    contestId: ID!
  }

  input ContestInfoInput {
    contestId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createPrize(data: CreatePrizeInput): Prize!
    # createPrizeSet
    createContest(data: CreateContestInput!): Contest!
    deleteContest(data: DeleteContestInput!): Contest!
    joinContest(data: JoinContestInput!): Contest!
    # submitPostToContest(data: SubmitPostToContestInput): Contest_Score
    # deletePostToContest(data: SubmitPostToContestInput): Contest_Score
    # endContest
    # voteContest
    # unvoteContest
  }

  # input SubmitPostToContestInput {
  #   postId: ID!
  #   contestId: ID!
  # }

  input CreatePrizeInput {
    name: String!
    prizeImageURL: String!
  }

  input CreateContestInput {
    name: String!
    contestImageURL: String!
    description: String!

    startDate: Int!
    endDate: Int

    contestPrizeList: [CreateContestPrizeInput]!
  }

  input CreateContestPrizeInput {
    prizeId: String
    type: String
    title: String
  }

  input DeleteContestInput {
    contestId: ID!
  }

  input JoinContestInput {
    contestId: ID!
    userId: ID!
  }

  type Contest {
    id: ID!
    name: String!
    contestImageURL: String!
    description: String!

    startDate: Int!
    endDate: Int

    joinedUserList: [User]!
    scores: [Contest_Score]!
    contestPrizeList: [Contest_Prize]!
  }

  type Contest_Score {
    id: ID!

    contest: Contest!
    user: User!
    post: Post!
    score: Int
  }

  type Contest_Prize {
    id: ID!
    contest: Contest!
    prize: Prize!
    user: User
    title: String!
    type: String!
  }

  type Prize {
    id: ID!
    name: String!
    prizeImageURL: String!
    contestPrizeList: [Contest_Prize]
  }
`;

export default contestDefs;
