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
import notiMutation from './notification.js';

const Mutation = {
  ...userMutation,
  ...levelMutation,
  ...imageMutation,
  ...imageInfoMutation,
  ...postMutation,
  ...storyMutation,
  ...commentMutation,
  ...categoryMutation,
  ...albumMutation,
  ...tagMutation,
  ...followerMutation,
  ...followingMutation,
  ...reportMutation,
  ...contestMutation,
  ...chatMutation,
  ...messageMutation,
  ...profileMutation,
  ...skillMutation,
  ...utilityMutation,
  ...notiMutation,
};

export default Mutation;
