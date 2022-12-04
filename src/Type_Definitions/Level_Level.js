import gql from 'graphql-tag';

const levelDefs = gql`
  extend type Query {
    allUserLevels: [Level!]!
  }

  extend type Mutation {
    # createImage(data: CreateImageInput!): Image!
  }

#   input CreateImageInput {
#     url: String!
#     hash: String!
#   }

  type Level {
    currentXP: Number!
    currentLevel: Number!
    user: User!
  }
`;

export default levelDefs;
