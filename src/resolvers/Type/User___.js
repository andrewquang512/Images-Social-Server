import { prisma } from '../../prisma/database.js';

const User = {
  level: async (parent, args, info) => {
    return await prisma.level.findUnique({
      where: {
        userId: parent.id,
      },
    });
  },
  posts: async (parent, args, info) => {
    return await prisma.post.findMany({
      where: {
        userId: parent.id,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
};

export default User;
