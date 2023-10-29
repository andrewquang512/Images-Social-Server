import { prisma } from '../../prisma/database.js';

const Comment = {
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  postId: async (parent, args, info) => {
    return await prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    });
  },
  storyId: async (parent, args, info) => {
    return await prisma.story.findUnique({
      where: {
        id: parent.storyId,
      },
    });
  },
};

export default Comment;
