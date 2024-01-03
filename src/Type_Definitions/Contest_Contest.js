import gql from 'graphql-tag';

const contestDefs = gql`
  extend type Query {
    allContests: [Contest]!
    contestInfo(data: ContestInfoInput!): Contest!
    contestPosts(
      contestId: String
      userId: String
      after: String
    ): PostConnection!
    # getTopContestPosts(contestId: String, top: Int!): [Post]!
    getTopContestPosts(data: ContestInfoInput!): [Post]!
    getUserPrizes(data: UserPrizeInput!): [Contest_Prize]!
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
    # createPrize(data: CreatePrizeInput): Prize!
    # createPrizeSet
    createContest(data: CreateContestInput!): Contest!
    deleteContest(data: DeleteContestInput!): Contest!
    joinContest(data: JoinContestInput!): Contest!
    endContest(data: EndContestInput!): Contest!
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

  # input CreatePrizeInput {
  #   name: String!
  #   prizeImageURL: String!
  # }

  input CreateContestInput {
    name: String!
    contestImageURL: String!
    description: String!

    startDate: String!
    endDate: String
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

  input EndContestInput {
    contestId: ID!
  }

  input UserPrizeInput {
    userId: ID!
  }

  type Contest {
    id: ID!
    name: String!
    contestImageURL: String!
    description: String!

    startDate: String!
    endDate: String
    isFinished: Boolean!

    joinedUserIds: [User]!
    contestPrizeList: [Contest_Prize]!
  }

  # type Contest_Score {
  #   id: ID!

  #   contest: Contest!
  #   user: User!
  #   post: Post!
  #   score: Int
  # }

  type Contest_Prize {
    id: ID!

    contestId: Contest!
    userId: User!

    title: String!
    type: String!
    prizeImageURL: String!
  }

  # type Prize {
  #   id: ID!
  #   name: String!
  #   prizeImageURL: String!
  #   contestPrizeList: [Contest_Prize]
  # }
`;

export default contestDefs;

// https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/3.png
// https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/2.png
// https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/1.png
