import { prisma } from '../../prisma/database.js';

const Chat = {
  userIDs: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.userIDs },
      },
    });
  },
  messages: async (parent, args, info) => {
    return await prisma.message.findMany({
      where: {
        id: { in: parent.messages },
      },
    });
  },
};

export default Chat;
