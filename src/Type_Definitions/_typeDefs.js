import gql from 'graphql-tag';
// Definitions
import userDefs from './User_User.js';
import levelDefs from './Level_Level.js';
import imageDefs from './Image_Image.js';
import postDefs from './Post_Post.js';

const baseDefs = gql`
  type Query {
    _TEST_QUERY: String
  }

  type Mutation {
    _TEST_MUTATION(id: ID!): String!
  }
`;

const typeDefs = [baseDefs, userDefs, levelDefs, imageDefs, postDefs];

export default typeDefs;
