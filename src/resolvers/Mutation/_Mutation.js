import userMutation from './user.js';
import levelMutation from './level.js';
import imageMutation from './image.js';
// import postMutation from './post.js';

const Mutation = {
  // User
  ...userMutation,
  // Level
  ...levelMutation,
  // Image
  ...imageMutation,
  // Post
  // ...postMutation,
  // Comment
  // ...commentMutation,
};

export default Mutation;
