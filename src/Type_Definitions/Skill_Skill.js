import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';

const skillDefs = gql`
  extend type Query {
    getSkillDefinedList: [Skill]!
  }

  extend type Mutation {
    addSkillDefinedList(data: AddSkillDefinedListInput): String
  }

  input AddSkillDefinedListInput {
    nameList: [String]!
  }

  type Skill {
    id: ID!
    name: String!
    endorsements: [Endorsement]
  }
`;

export default skillDefs;
