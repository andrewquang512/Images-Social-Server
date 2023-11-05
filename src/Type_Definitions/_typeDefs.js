import gql from 'graphql-tag';
import userDefs from './User_User.js';
import levelDefs from './Level_Level.js';
import imageDefs from './Image_Image.js';
import imageInfoDefs from './ImageInfo_ImageInfo.js';
import postDefs from './Post_Post.js';
import storyDefs from './Story_Story.js';
import commentDefs from './Comment_Comment.js';
import tagDefs from './Tag_Tag.js';
import categoryDefs from './Category_Category.js';
import albumDefs from './Album_Album.js';
import followingDefs from './Following_Following.js';
import followerDefs from './Follower_Follower.js';
import reportDefs from './Report_Report.js';
import profileDefs from './Profile_Profile.js'

const baseDefs = gql`
  type Query {
    _TEST_QUERY: String
  }

  type Mutation {
    _TEST_MUTATION: Int!
  }

  type DeleteAllReturnType {
    count: Int!
    message: String
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
  commentDefs,
  tagDefs,
  // profileDefs,
  categoryDefs,
  albumDefs,
  followingDefs,
  followerDefs,
  reportDefs,
];

export default typeDefs;
