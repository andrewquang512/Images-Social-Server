import userMutation from './user.js';
import levelMutation from './level.js';
import imageMutation from './image.js';
import imageInfoMutation from './image_info.js';
import postMutation from './post.js';
import storyMutation from './story.js';

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
  // ...commentMutation,
};

export default Mutation;
