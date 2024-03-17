import { prisma } from '../../prisma/database.js';

const notiMutation = {
  deleteNoti: async (parent, args, info) => {
    let notification;
    try {
      notification = await prisma.notification.delete({
        where: {
          id: args.data.notiId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return notification;
  },
  deleteNotiUser: async (parent, args, info) => {
    let notification;
    try {
      notification = await prisma.notification.deleteMany({
        where: {
          userIds: { has: args.data.userId },
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return notification;
  },
  deleteAllNoti: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.notification.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
};

export default notiMutation;
