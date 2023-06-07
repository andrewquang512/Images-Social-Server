import userQuery from './USER.js';
import levelQuery from './LEVEL.js';
import imageQuery from './IMAGE.js';
import imageInfoQuery from './IMAGE_INFO.js';
import postQuery from './POST.js';

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
  // Comment
  // ...commentQuery,
};

export default Query;
