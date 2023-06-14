import gql from 'graphql-tag';

const levelDefs = gql`
  extend type Query {
    allLevels: [Level]!
    userLevel(data: UserLevelInput!): Level!
  }

  extend type Mutation {
    # Ko xai boi vi tao user level truc tiep trong createUser
    # src/resolvers/Mutation/user.js
    # createLevel(data: CreateLevelInput!): Level!
    updateLevel(data: UpdateLevelInput!): Level!
  }

  input UserLevelInput {
    userId: ID!
  }

  input UpdateLevelInput {
    userId: ID!
    xp: Int!
  }

  type Level {
    id: ID!
    currentXP: Int!
    currentLevel: Int!
    userId: User!
  }
`;

export default levelDefs;
