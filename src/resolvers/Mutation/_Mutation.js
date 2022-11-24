import userMutation from './user.js';
import imageMutation from './image.js';
// import postMutation from './post.js';

const Mutation = {
  // User
  ...userMutation,
  // Image
  ...imageMutation,
  // Post
  // ...postMutation,
  // Comment
  // ...commentMutation,
};

export default Mutation;
