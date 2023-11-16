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
import contestDefs from './Contest_Contest.js';
import profileDefs from './Profile_Profile.js';
import chatDefs from './Chat_Chat.js';
import messageDefs from './Message_Message.js';
import skillDefs from './Skill_Skill.js';

const baseDefs = gql`
  type Query {
    _TEST_QUERY: String
  }

  type Mutation {
    _TEST_MUTATION: Int!
  }

  type Subscription {
    _TEST_SUBCRIPTION: Int!
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
  categoryDefs,
  albumDefs,
  followingDefs,
  followerDefs,
  reportDefs,
  contestDefs,
  chatDefs,
  messageDefs,
  profileDefs,
  skillDefs,
];

export default typeDefs;
