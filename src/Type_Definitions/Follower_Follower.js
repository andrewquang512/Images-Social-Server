import gql from 'graphql-tag';

const followerDefs = gql`
  extend type Query {
    allFollower: [Follower]!
    userFollowerInfo(data: UserFollowerInfoInput!): Follower!
  }

  input UserFollowerInfoInput {
    userId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  #   extend type Mutation {
  #     # createUser(data: CreateUserInput!): User!
  #     updateFollowing(data: UpdateFollowingInput!): Follower!
  #   }

  #   input UpdateFollowingInput {
  #     userId: ID!
  #     followingId: ID!
  #   }

  type Follower {
    id: ID!
    userFollower: [User]!

    userId: User!
  }
`;

export default followerDefs;
