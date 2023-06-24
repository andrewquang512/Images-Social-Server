import gql from 'graphql-tag';

const followingDefs = gql`
  extend type Query {
    allFollowing: [Following]!
    userFollowingInfo(data: UserFollowingInfoInput!): [Following]!
  }

  input UserFollowingInfoInput {
    userId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    # createUser(data: CreateUserInput!): User!
    updateFollowing(data: UpdateFollowingInput!): Following!
  }

  input UpdateFollowingInput {
    userId: ID!
    followingId: ID!
  }

  type Following {
    id: ID!
    userFollowing: [User]!

    userId: User!
  }
`;

export default followingDefs;
