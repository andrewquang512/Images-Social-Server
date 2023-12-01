import userQuery from './USER.js';
import levelQuery from './LEVEL.js';
import imageQuery from './IMAGE.js';
import imageInfoQuery from './IMAGE_INFO.js';
import postQuery from './POST.js';
import storyQuery from './STORY.js';
import commentQuery from './COMMENT.js';
import categoryQuery from './CATEGORY.js';
import albumQuery from './ALBUM.js';
import tagQuery from './TAG.js';
import followerQuery from './FOLLOWER.js';
import followingQuery from './FOLLOWING.js';
import reportQuery from './REPORT.js';
import contestQuery from './CONTEST.js';
import chatQuery from './CHAT.js';
import messageQuery from './MESSAGE.js';
import skillQuery from './SKILL.js';
import notiQuery from './NOTIFICATION.js';

const Query = {
  ...userQuery,
  ...levelQuery,
  ...imageQuery,
  ...imageInfoQuery,
  ...postQuery,
  ...storyQuery,
  ...commentQuery,
  ...categoryQuery,
  ...albumQuery,
  ...tagQuery,
  ...followerQuery,
  ...followingQuery,
  ...reportQuery,
  ...contestQuery,
  ...chatQuery,
  ...messageQuery,
  ...skillQuery,
  ...notiQuery,
};

export default Query;
