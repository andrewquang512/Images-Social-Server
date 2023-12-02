import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';
import { UserSuggestion } from '../Common/suggestUser.js';

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

  userFollow: async (parent, args, info) => {
    const follower = await prisma.follower.findUnique({
      where: {
        userId: args.data.userId,
      },
    });

    const following = await prisma.following.findUnique({
      where: {
        userId: args.data.userId,
      },
    });

    return { follower, following };
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

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        endorsements: true,
        followings: true,
        interestCategories: true,
      },
    });

    const [allUsers, count] = await Promise.all([
      prisma.user.findMany({
        where: {
          id: { not: userId },
          isAdmin: 0,
          NOT: {
            id: { in: currentUser.userFollowing },
          },
        },
        include: {
          endorsements: true,
          followings: true,
          interestCategories: true,
        },
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

    const userSuggestion = new UserSuggestion();
    const suggestedUsers = userSuggestion.getUserSuggestion(
      currentUser,
      allUsers,
    );

    const result = manualPagination(limit, after, suggestedUsers);

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
  getAllUserLeaderboard: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        isAdmin: 0,
      },
      take: 5,
      orderBy: {
        level: { currentLevel: 'desc' },
      },
    });
  },
  getUserFollowingLeaderBoard: async (parent, args, info) => {
    const currentUser = await prisma.following.findUnique({
      where: {
        userId: args.data.userId,
      },
    });

    return await prisma.user.findMany({
      where: {
        id: { in: currentUser.userFollowing },
        isAdmin: 0,
      },
      take: 5,
      orderBy: {
        level: { currentLevel: 'desc' },
      },
    });
  },
};

/**
 * @param {number} limit
 * @param {string} index
 * @param {import('../Common/suggestUser.js').UserInfo[]} list
 */
const manualPagination = (limit = DEFAULT_LIMIT, after, list) => {
  if (!after) {
    const result = list.slice(0, limit);
    return result;
  }

  const breakPoint = list.findIndex((each) => each.id === after);
  const result = list.slice(breakPoint + 1, limit + breakPoint + 1);
  return result;
};

export default userQuery;
