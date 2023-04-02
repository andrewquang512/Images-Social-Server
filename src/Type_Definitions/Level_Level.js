import gql from 'graphql-tag';

const levelDefs = gql`
  extend type Query {
    allUserLevels: [Level!]!
    userLevel(userID: String!): Level!
  }

  # extend type Mutation {
  #   createLevel(data: CreateLevelInput!): Level!
  # }

  type Level {
    id: ID!
    currentXP: Int!
    currentLevel: Int!
    userID: String!
  }
`;

export default levelDefs;
