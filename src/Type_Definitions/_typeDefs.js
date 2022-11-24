import gql from 'graphql-tag';
// Definitions
import userDefs from './User_User.js';
import imageDefs from './Image_Image.js';
// const postDefs = require('./Post_Post.js');
// const cmtDefs = require('./Cmt_Cmt.js');

const baseDefs = gql`
  type Query {
    _TEST_QUERY: String
  }

  type Mutation {
    _TEST_MUTATION(id: ID!): String!
  }
`;

const typeDefs = [baseDefs, userDefs, imageDefs];

export default typeDefs;
