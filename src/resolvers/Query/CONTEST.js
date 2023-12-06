import { DEFAULT_LIMIT } from 'constants.js';
import { prisma } from '../../prisma/database.js';
import _ from 'lodash';

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

  /**
   * @param {*} parent
   * @param {{data: {contestId: string}, limit: number, after: string}} args
   * @param {*} info
   */
  contestPosts: async (parent, args, info) => {
    const { contestId } = args.data || {};
    const { after, limit } = args;

    const [contestScores, count] = await Promise.all([
      prisma.contest_Score.findMany({
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          skip: 1,
        }),
        where: {
          id: contestId,
        },
        include: {
          post: true,
        },
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.contest_Score.count(),
    ]);

    const result = contestScores.map((each) => each.post);
    console.log('Result', result);
    console.log('count', count);

    const sortedResult = result.sort(
      (before, after) => after.votes - before.votes,
    );
    const hasNextPage =
      sortedResult.length !== 0 &&
      sortedResult.length < count &&
      sortedResult.length === limit;
    console.log('hasNextPage', hasNextPage);

    const nodes = sortedResult.map((each) => ({
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
   * @param {{contestId: string, top: number}} args
   * @param {*} info
   */
  getTopContestPosts: async (parent, args, info) => {
    const { contestId, top } = args;

    const result = await prisma.contest_Score.findMany({
      where: {
        contestId: contestId,
      },
      take: top,
      include: {
        post: true,
      },
      orderBy: [
        { score: 'desc' },
        {
          createdAt: 'asc',
        },
      ],
    });

    if (result.length === 0) return [];

    return result.map((each) => each.post);
  },
};

export default contestQuery;
