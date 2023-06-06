import gql from 'graphql-tag';

const levelDefs = gql`
  extend type Query {
    allLevels: [Level!]!
    userLevel(userID: String!): Level!
  }

  # extend type Mutation {
  # Ko xai boi vi tao user level truc tiep trong createUser
  # src/resolvers/Mutation/user.js
  # createLevel(data: CreateLevelInput!): Level!
  # }

  type Level {
    id: ID!
    currentXP: Int!
    currentLevel: Int!
    userId: User!
  }
`;

export default levelDefs;
