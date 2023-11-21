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
        ...(after && {
          skip: 1,
        }),
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

    const hasNextPage =
      result.length !== 0 && result.length < count && result.length === limit;
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
  getAllUserStories: async (parent, args, info) => {
    let a, nodes;
    const after = args.after;

    if (args.currentUserId === args.userId) {
      a = await prisma.story.findMany({
        where: {
          userId: args.userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      // console.log(2);
      const follower = await prisma.follower.findUnique({
        where: {
          userId: args.userId,
        },
      });
      // console.log({ follower });

      if (follower.userFollower.includes(args.currentUserId)) {
        // console.log(3);
        a = await prisma.story.findMany({
          where: {
            userId: args.userId,
            OR: [
              { storyViewStatus: 'PUBLIC' },
              { storyViewStatus: 'ONLY_FOLLOWERS' },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } else {
        a = await prisma.story.findMany({
          where: {
            userId: args.userId,
            storyViewStatus: 'PUBLIC',
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      }
    }

    if (!after) {
      nodes = a.slice(0, 2).map((story) => ({
        node: story,
        cursor: story.id,
      }));

      // console.log({ nodes });
    } else {
      // console.log('in after');
      const index = a.findIndex((story) => story.id === after);
      nodes = a.slice(index + 1, index + 3).map((story) => ({
        node: story,
        cursor: story.id,
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

export default storyQuery;
