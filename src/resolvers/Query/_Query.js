import userQuery from './USER.js';
import levelQuery from './LEVEL.js';
import imageQuery from './IMAGE.js';

const Query = {
  // User
  ...userQuery,
  // Level
  ...levelQuery,
  // Image
  ...imageQuery,
  // Post
  // ...postQuery,
  // Comment
  // ...commentQuery,
};

export default Query;
