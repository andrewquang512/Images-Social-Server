import { prisma } from '../../prisma/database.js';

const contestQuery = {
  allContests: async (parent, args, info) => {
    return await prisma.contest.findMany();
  },
  contestInfo: async (parent, args, info) => {
    return await prisma.contest.findUnique({
      where: {
        id: args.data.contestId,
      },
    });
  },
  contestPosts: async (parent, args, info) => {
    const { contestId, after } = args;
    console.log(args);
    let nodes, a;

    a = await prisma.post.findMany({
      where: {
        contestId: contestId,
      },
      orderBy: [
        { points: 'desc' },
        {
          createdAt: 'desc',
        },
      ],
    });

    if (!after) {
      nodes = a.slice(0, 4).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      console.log({ nodes });
    } else {
      const index = a.findIndex((post) => post.id === after);
      nodes = a.slice(index + 1, index + 3).map((post) => ({
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

export default contestQuery;
