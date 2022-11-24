import userQuery from './USER.js';
import imageQuery from './IMAGE.js';

const Query = {
  // User
  ...userQuery,
  // Image
  ...imageQuery,
  // Post
  // ...postQuery,
  // Comment
  // ...commentQuery,
};

export default Query;
