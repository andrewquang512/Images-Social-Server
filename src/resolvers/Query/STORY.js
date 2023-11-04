import { DEFAULT_LIMIT } from '../../constants.js';
import { prisma } from '../../prisma/database.js';

const storyQuery = {
  allStories: async (parent, args, info) => {
    try {
      return await prisma.story.findMany();
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  /**
   * @param {*} parent
   * @param {{limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getNewStories: async (parent, args, info) => {
    const { limit, after } = args;

    const [result, count] = await prisma.$transaction([
      prisma.story.findMany({
        take: limit || DEFAULT_LIMIT,
        skip: 1,
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

    const hasNextPage = result.length !== 0 && result.length <= count;
    console.log('hasNextPage', hasNextPage);

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

  /**
   * @param {*} parent
   * @param {{data: {storyId: string}}} args
   * @param {*} info
   * @returns
   */
  storyInfo: async (parent, args, info) => {
    return await prisma.story.findUnique({
      where: {
        id: args.data.storyId,
      },
    });
  },
};

export default storyQuery;
