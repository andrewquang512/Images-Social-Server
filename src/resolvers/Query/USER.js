import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const userQuery = {
  allUsers: async (parent, args, info) => {
    return await prisma.user.findMany();
  },
  userInfo: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: args.data.userId,
      },
      include: {
        posts: true,
      },
    });
  },
  verifyUser: async (parent, args, info) => {
    return await prisma.user.findFirst({
      where: {
        AND: [
          { hashPassword: args.data.hashPassword },
          { email: args.data.email },
        ],
      },
    });
  },

  /**
   *
   * @param {*} parent
   * @param {{data: {userId: string}, limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  suggestUserToFollow: async (parent, args, info) => {
    const { after, limit } = args;
    const { userId } = args.data;

    const currentUser = await prisma.following.findUnique({
      where: {
        userId: userId,
      },
    });

    const [result, count] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          id: { not: userId },
          isAdmin: 0,
          NOT: {
            id: { in: currentUser.userFollowing },
          },
        },
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          skip: 1,
        }),
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.user.count({
        where: {
          id: { not: userId },
          isAdmin: 0,
          NOT: {
            id: { in: currentUser.userFollowing },
          },
        },
      }),
    ]);

    // console.log('Result', result);
    // console.log('count', count);

    const hasNextPage =
      result.length !== 0 && result.length < count && result.length === limit;
    // console.log('hasNextPage', hasNextPage);

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
};

export default userQuery;
