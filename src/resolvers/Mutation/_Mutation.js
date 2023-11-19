import userMutation from './user.js';
import levelMutation from './level.js';
import imageMutation from './image.js';
import imageInfoMutation from './image_info.js';
import postMutation from './post.js';
import storyMutation from './story.js';
import commentMutation from './comment.js';
import categoryMutation from './category.js';
import albumMutation from './album.js';
import tagMutation from './tag.js';
import followerMutation from './follower.js';
import followingMutation from './following.js';
import reportMutation from './report.js';
import contestMutation from './contest.js';
import chatMutation from './chat.js';
import messageMutation from './message.js';
import profileMutation from './profile.js';
import skillMutation from './skill.js';
import utilityMutation from './utility.js';

const Mutation = {
  // User
  ...userMutation,
  // Level
  ...levelMutation,
  // Image
  ...imageMutation,
  // Image Info
  ...imageInfoMutation,
  // Post
  ...postMutation,
  // Story
  ...storyMutation,
  // Comment
  ...commentMutation,
  // Category
  ...categoryMutation,
  // Album
  ...albumMutation,
  // Tag
  ...tagMutation,
  // Follower
  ...followerMutation,
  // Following
  ...followingMutation,
  // Report
  ...reportMutation,
  // Contest
  ...contestMutation,
  // Chat
  ...chatMutation,
  // Message
  ...messageMutation,
  ...profileMutation,
  ...skillMutation,
  ...utilityMutation,
};

export default Mutation;
