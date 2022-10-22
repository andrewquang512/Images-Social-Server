const userQuery = require('./USER.js');
const postQuery = require('./POST.js');
// const commentQuery = require('./COMMENT.js');

const Query = {
  // User
  ...userQuery,
  // Post
  ...postQuery,
  // Comment
  // ...commentQuery,
};

module.exports = Query;
