import gql from 'graphql-tag';
import commonDefs from './Common_Common.js'

/**
 * @description {import('./User_User.js)}
 * ? profileDefs is a part of userDefs
 */
const profileDefs = gql`
  extend type Query {
    getProfile(data: ProfileInfoInput!): Profile!
  }

  input ProfileInfoInput {
    userId: ID!
  }

  type Profile {
    id: ID!
    isAdmin: Int!
    createdAt: String!
    updatedAt: String

    endosers: Level!
  }
`;

export default profileDefs;
