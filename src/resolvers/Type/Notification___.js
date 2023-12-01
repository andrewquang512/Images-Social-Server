import { prisma } from '../../prisma/database.js';

const Notification = {
  userTriggerId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  userIds: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.userIds },
      },
    });
  },
};

export default Notification;
