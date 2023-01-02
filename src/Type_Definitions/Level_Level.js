import gql from 'graphql-tag';

const levelDefs = gql`
  extend type Query {
    allUserLevels: [Level!]!
    userLevel(query: UserLevelInput!): Level!
  }

  # extend type Mutation {
  #   createLevel(data: CreateLevelInput!): Level!
  # }

  input UserLevelInput {
    userID: String!
  }

  type Level {
    id: ID!
    currentXP: Int!
    currentLevel: Int!
    userID: String!
  }
`;

export default levelDefs;
