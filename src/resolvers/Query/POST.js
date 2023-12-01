import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { compareImages } from '../Common/compareImages.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const postQuery = {
  allPosts: async (parent, args, info) => {
    return await prisma.post.findMany();
  },
  postInfo: async (parent, args, info) => {
    return await prisma.post.findUnique({
      where: {
        id: args.data.postId,
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{userId: string, categoryIds: String[], timeCall: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getNewFeed: async (parent, args, info) => {
    const { userId = undefined, categoryIds = [] } = args;
    // console.log(args);

    let a,
      nodes = [],
      timeCall = args.timeCall;

    const after = args.after;

    if (!after) {
      timeCall += 1;

      a = await prisma.post.findMany({
        where: {
          userId: userId,
          categoryId: {
            hasEvery: categoryIds,
          },
          OR: [
            { postViewStatus: 'PUBLIC' },
            { postViewStatus: 'ONLY_FOLLOWERS' },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // console.log({ a });

      nodes = a.slice(0, 2).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      // console.log({ nodes });
    } else {
      const b = await prisma.following.findUnique({
        where: {
          userId: userId,
        },
      });
      // console.log({ b });

      // User not following anyone
      if (!b.userFollowing.length) {
        console.log('User not following anyone');
        timeCall += 1;
      }

      // console.log({ b });

      let countEmpty = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (countEmpty === 2) break;

        // Following
        if (timeCall % 2 === 1) {
          a = await prisma.post.findMany({
            where: {
              AND: [
                { userId: { in: b.userFollowing } },
                {
                  categoryId: {
                    hasEvery: categoryIds,
                  },
                },
              ],
              OR: [
                { postViewStatus: 'PUBLIC' },
                { postViewStatus: 'ONLY_FOLLOWERS' },
              ],
              NOT: {
                reportedUserIds: {
                  has: userId,
                },
              },
            },
            orderBy: [
              {
                createdAt: 'desc',
              },
              { points: 'desc' },
            ],
            skip: Math.trunc(timeCall / 2) * 6,
            take: 6,
          });

          nodes = _.shuffle(a).map((post) => ({
            node: post,
            cursor: post.id,
          }));
          // console.log({ nodes }, 'in following');

          timeCall += 1;

          if (nodes.length === 0) {
            timeCall += 1;
            countEmpty += 1;
            // console.log({ countEmpty });
          } else break;
        }

        // Not Following
        if (timeCall % 2 === 0) {
          a = await prisma.post.findMany({
            where: {
              AND: [
                { userId: { notIn: b.userFollowing } },
                { userId: { not: userId } },
              ],
              userId: { notIn: b.userFollowing },
              postViewStatus: 'PUBLIC',
              categoryId: {
                hasEvery: categoryIds,
              },
              NOT: {
                reportedUserIds: {
                  has: userId,
                },
              },
            },
            orderBy: [
              {
                createdAt: 'desc',
              },
              { points: 'desc' },
            ],
            skip: (timeCall / 2 - 1) * 3,
            take: 3,
          });

          nodes = _.shuffle(a).map((post) => ({
            node: post,
            cursor: post.id,
          }));
          // console.log({ nodes }, 'not in following');

          timeCall += 1;

          if (nodes.length === 0) {
            timeCall += 1;
            countEmpty += 1;
            // console.log({ countEmpty });
          } else break;
        }
      }
    }

    // console.log('return', { nodes, timeCall });
    return {
      edges: nodes,
      pageInfo: {
        hasNextPage: nodes.length ? true : false,
        hasPreviousPage: after ? true : false,
        // startCursor,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
      timeCall,
    };
  },
  getAllUserPosts: async (parent, args, info) => {
    let a, nodes;
    const after = args.after;

    if (args.currentUserId === args.userId) {
      a = await prisma.post.findMany({
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
        a = await prisma.post.findMany({
          where: {
            userId: args.userId,
            OR: [
              { postViewStatus: 'PUBLIC' },
              { postViewStatus: 'ONLY_FOLLOWERS' },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } else {
        a = await prisma.post.findMany({
          where: {
            userId: args.userId,
            postViewStatus: 'PUBLIC',
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      }
    }

    if (!after) {
      nodes = a.slice(0, 2).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      // console.log({ nodes });
    } else {
      // console.log('in after');
      const index = a.findIndex((post) => post.id === after);
      nodes = a.slice(index + 1, index + 3).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      // console.log({ nodes });
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
  searchQuery: async (parent, args, info) => {
    let tags = [],
      users = [];

    if (!args.data.searchString) {
      return { tags, users };
    }

    users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: args.data.searchString,
            },
          },
          {
            name: {
              contains: args.data.searchString,
            },
          },
        ],
        AND: [
          {
            isAdmin: 0,
          },
        ],
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    tags = await prisma.tag.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: args.data.searchString,
            },
          },
          {
            name: {
              contains: args.data.searchString,
            },
          },
        ],
      },
    });

    return { tags, users };
  },

  /**
   * @param {*} parent
   * @param {{data: {postId: string}, limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  similarPosts: async (parent, args, info) => {
    const { after, limit = DEFAULT_LIMIT } = args;
    const { postId = undefined } = args.data ? args.data : {};

    if (!postId) {
      throw new Error('postId is not provided');
    }

    // allImages = _.filter(allImages, (o) => o.id != currentImage.id);

    const [referenceImage, initPosts] = await Promise.all([
      prisma.image.findUnique({
        where: {
          postId: postId,
        },
      }),
      prisma.post.findMany({
        take: limit,
        ...(after && {
          skip: 1,
        }),
        ...(after && {
          cursor: {
            id: after,
          },
        }),
        where: {
          NOT: [
            {
              image: null,
            },
            {
              id: postId,
            },
          ],
        },
        include: {
          image: true,
        },
      }),
    ]);

    if (!referenceImage) {
      throw new Error('postId not have any image');
    }

    const result = [];
    // console.log('Init Stage wit referenceImage URL: ', referenceImage.url);
    const initImages = initPosts.map((each) => each.image);
    const isSimilarImageMap = initImages.map((each) =>
      compareImages(referenceImage.hash, each.hash),
    );
    for (const imgIndex in initImages) {
      if (isSimilarImageMap[imgIndex]) {
        result.push(initPosts[imgIndex]);
      }
    }

    let lastId = initPosts[initPosts.length - 1].id;
    let nextItem = await prisma.post.count({
      take: 1,
      skip: 1,
      cursor: {
        id: lastId,
      },
    });
    // console.log('Loop Stage wit referenceImage URL: ', referenceImage.url);
    while (result.length !== limit && nextItem) {
      const nextPosts = await prisma.post.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: lastId,
        },
        where: {
          NOT: [
            {
              image: null,
            },
            {
              id: postId,
            },
          ],
        },
        include: {
          image: true,
        },
      });

      const nextImages = nextPosts.map((each) => each.image);
      const isSimilarImageMap = nextImages.map((each) =>
        compareImages(referenceImage.hash, each.hash),
      );
      for (const imgIndex in nextImages) {
        if (result.length === limit) {
          // console.log('result is match limit, Stopping');
          break;
        }
        if (isSimilarImageMap[imgIndex]) {
          result.push(nextPosts[imgIndex]);
        }
      }

      lastId =
        result.length === limit
          ? result[result.length - 1].id
          : nextPosts[nextPosts.length - 1].id;
      nextItem = await prisma.post.count({
        take: 1,
        skip: 1,
        cursor: {
          id: lastId,
        },
      });
    }

    // console.log('Result length', result.length);

    const hasNextPage = result.length !== 0 && nextItem;
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

  /**
   * @param {*} parent
   * @param {{data: {categoryIds: string[]}, limit: number, after: string}} args
   * @param {*} info
   * @returns
   */
  explorePosts: async (parent, args, info) => {
    const { categoryIds = [] } = args.data ? args.data : {};
    const { after, limit = DEFAULT_LIMIT } = args;

    const [result, count] = await Promise.all([
      prisma.post.findMany({
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          skip: 1,
        }),
        where: {
          ...(categoryIds.length > 0 && {
            categoryId: {
              hasSome: categoryIds,
            },
          }),
          image: {
            isNot: null,
          },
        },
        include: {
          image: true,
        },
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
      prisma.post.count(),
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
      edges: shuffleArrayExceptFirstAndLast(nodes),
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

/**
 * @link https://stackoverflow.com/questions/50536044/swapping-all-elements-of-an-array-except-for-first-and-last
 * @param {any[]} arr
 * @returns {any[]}
 */
const shuffleArrayExceptFirstAndLast = (arr) => {
  if (arr.length < 3) {
    return arr;
  }
  for (let i = arr.length - 2; i > 1; --i) {
    const j = 1 + Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export default postQuery;
