import { prisma } from '../../prisma/database.js';

const Album = {
  posts: async (parent, args, info) => {
    return await prisma.post.findMany({
      where: {
        albumId: { has: parent.id },
      },
    });
  },
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};

export default Album;
