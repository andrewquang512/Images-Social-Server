import { DEFAULT_LIMIT } from '../../constants.js';

const storyQuery = {
  allStories: async (parent, args, { prisma }, info) => {
    try {
      return await prisma.story.findMany();
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /**
   *
   * @param {*} parent
   * @param {{limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getNewStories: async (parent, args, { prisma }, info) => {
    const { limit, after } = args;

    const [result, count] = await prisma.$transaction([
      prisma.story.findMany({
        take: limit || DEFAULT_LIMIT,
        orderBy: {
          createdAt: 'desc',
        },
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.story.count(),
    ]);

    console.log('Result', result);
    console.log('count', count);

    const hasNextPage = result.length === 0 || result.length <= count;
    // console.log(nodes.slice(-1));
    console.log({ hasNextPage });

    const nodes = result.map((each) => ({
      node: each,
      cursor: each.id,
    }));
    return {
      edges: nodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after ? true : false,
        // startCursor,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
    };
  },
  storyInfo: async (parent, args, { prisma }, info) => {
    return await prisma.story.findUnique({
      where: {
        id: args.data.storyId,
      },
    });
  },
};

export default storyQuery;
