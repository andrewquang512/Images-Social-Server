import userQuery from './USER.js';
import levelQuery from './LEVEL.js';
import imageQuery from './IMAGE.js';
import imageInfoQuery from './IMAGE_INFO.js';
import postQuery from './POST.js';
import storyQuery from './STORY.js';
import commentQuery from './COMMENT.js';
import categoryQuery from './CATEGORY.js';
import followerQuery from './FOLLOWER.js';
import followingQuery from './FOLLOWING.js';

const Query = {
  // User
  ...userQuery,
  // Level
  ...levelQuery,
  // Image
  ...imageQuery,
  // Image Info
  ...imageInfoQuery,
  // Post
  ...postQuery,
  // Story
  ...storyQuery,
  // Comment
  ...commentQuery,
  // Category
  ...categoryQuery,
  // Follower
  ...followerQuery,
  // Following
  ...followingQuery,
};

export default Query;
