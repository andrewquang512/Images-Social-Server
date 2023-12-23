import { prisma } from '../../prisma/database.js';

const Message = {
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  chatId: async (parent, args, info) => {
    return await prisma.chat.findUnique({
      where: {
        id: parent.chatId,
      },
    });
  },
};

export default Message;
