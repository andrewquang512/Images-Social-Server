import { prisma } from '../../prisma/database.js';

const chatQuery = {
  allChats: async (parent, args, info) => {
    return await prisma.chat.findMany();
  },
  chatInfo: async (parent, args, info) => {
    return await prisma.chat.findUnique({
      where: {
        id: args.data.chatId,
      },
    });
  },
};

export default chatQuery;
