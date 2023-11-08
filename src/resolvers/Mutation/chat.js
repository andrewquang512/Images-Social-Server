import { prisma } from '../../prisma/database.js';

const chatMutation = {
  createChat: async (parent, args, info) => {
    let result;

    result = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasEvery: args.data.userIDs,
        },
      },
    });

    if (result.length === 1) return result;
    else {
      try {
        result = await prisma.chat.create({
          data: {
            userIDs: args.data.userIDs,
            messages: {
              create: {
                message: args.data.firstMessage,
                isImage: args.data.isImage,
                userId: args.data.currentUserId,
              },
            },
          },
        });

        console.log({ result });

        await prisma.user.update({
          where: {
            id: args.data.userIDs[0],
          },
          data: {
            chatIDs: {
              push: result.id,
            },
          },
        });

        await prisma.user.update({
          where: {
            id: args.data.userIDs[1],
          },
          data: {
            chatIDs: {
              push: result.id,
            },
          },
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    return result;
  },
  deleteChat: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.chat.delete({
        where: {
          id: args.data.chatId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  deleteAllChat: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.chat.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
};

export default chatMutation;
