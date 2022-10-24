import userMutation from './user.js';
import postMutation from './post.js';

// const commentMutation = require('./comment.js');

const Mutation = {
  // User
  ...userMutation,
  // Post
  // ...postMutation,
  // Comment
  // ...commentMutation,
};

export default Mutation;
