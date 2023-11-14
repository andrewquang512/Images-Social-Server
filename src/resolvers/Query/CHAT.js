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
  getChatMessage: async (parent, args, info) => {
    const { chatId, after } = args;
    console.log(args);
    let nodes, a;

    a = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    if (!after) {
      nodes = a.slice(0, 10).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      console.log({ nodes });
    } else {
      const index = a.findIndex((post) => post.id === after);
      nodes = a.slice(index + 1, index + 10).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      console.log({ nodes });
    }

    const hasNextPage =
      nodes.length === 0
        ? false
        : nodes.slice(-1)[0].cursor !== a.slice(-1)[0].id;

    return {
      edges: nodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after ? true : false,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
    };
  },
};

export default chatQuery;
