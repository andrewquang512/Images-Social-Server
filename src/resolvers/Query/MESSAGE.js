import { prisma } from '../../prisma/database.js';

const messageQuery = {
  allMessages: async (parent, args, info) => {
    return await prisma.message.findMany();
  },
  messageInfo: async (parent, args, info) => {
    return await prisma.message.findUnique({
      where: {
        id: args.data.messageId,
      },
    });
  },
};

export default messageQuery;
