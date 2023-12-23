import { prisma } from '../../prisma/database.js';

const notiQuery = {
  allNotis: async (parent, args, info) => {
    return await prisma.notification.findMany();
  },
  userNotis: async (parent, args, info) => {
    return await prisma.notification.findMany({
      where: {
        userIds: { has: args.data.userId },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        // { isRead: 'desc' },
      ],
    });
  },
};

export default notiQuery;
