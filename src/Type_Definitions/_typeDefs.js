import gql from 'graphql-tag';
// Definitions
import userDefs from './User_User.js';
import levelDefs from './Level_Level.js';
import imageDefs from './Image_Image.js';
import imageInfoDefs from './ImageInfo_ImageInfo.js';
import postDefs from './Post_Post.js';
import storyDefs from './Story_Story.js';

const baseDefs = gql`
  type Query {
    _TEST_QUERY: Int
  }

  type Mutation {
    _TEST_MUTATION
  }
`;

const typeDefs = [
  baseDefs,
  userDefs,
  levelDefs,
  imageDefs,
  imageInfoDefs,
  postDefs,
  storyDefs,
];

export default typeDefs;
