import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';

/**
 * @description {import('./User_User.js)}
 * ? profileDefs is a part of userDefs
 */
const profileDefs = gql`
  extend type Query {
    getProfile(data: ProfileInfoInput!): Profile!
    getSkillDefinedList: [Skill]!
  }

  extend type Mutation {
    addBiography(data: AddBiographyInput!): Profile!
    addSkill(data: AddSkillInput!): Profile!
  }

  input ProfileInfoInput {
    userId: ID!
  }

  input AddBiographyInput {
    userId: ID!
    content: String!
  }

  input AddSkillInput {
    userId: ID!
    skillId: String!
  }

  type Profile {
    id: ID!
    endorsements: [Endorsement]
  }

  type Endorsement {
    id: ID!
    endorsers: [Profile]
    skillId: Skill
  }

  type Skill {
    id: ID!
    name: String!
    endorsements: [Endorsement]
  }
`;

export default profileDefs;
