import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const commentQuery = {
  /**
   *
   * @param {*} parent
   * @param {{data: {postId: string}, limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getCommentsByPostId: async (parent, args, info) => {
    const { postId } = args.data;
    const { after, limit } = args;

    const [result, count] = await prisma.$transaction([
      prisma.comment.findMany({
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          skip: 1,
        }),
        where: {
          postId: postId,
          parentId: null,
        },
        include: {
          child: {
            include: {
              child: true,
            },
          },
        },
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.comment.count(),
    ]);

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
   *
   * @param {*} parent
   * @param {{data: {storyId: string}, limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getCommentsByStoryId: async (parent, args, info) => {
    const { storyId } = args.data;
    const { after, limit } = args;

    const [result, count] = await prisma.$transaction([
      prisma.comment.findMany({
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          skip: 1,
        }),
        where: {
          storyId: storyId,
        },
        include: {
          child: {
            include: {
              child: true,
            },
          },
        },
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.comment.count(),
    ]);

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
   *
   * @param {*} parent
   * @param {{id: string}} args
   * @param {*} info
   */
  getCommentChild: async (parent, args, info) => {
    const { id } = args;
    const result = await prisma.comment.findFirst({
      where: {
        id: id,
      },
      include: {
        child: {
          include: {
            child: true,
          },
        },
      },
    });

    return result;
  },
};

export default commentQuery;
