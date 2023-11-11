import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { compareImages } from '../Common/compareImages.js';

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
   *
   * @param {*} parent
   * @param {{userId: string, categoryIds: String[], timeCall: number, after: string}} args
   * @param {*} info
   * @returns
   */
  getNewFeed: async (parent, args, info) => {
    const { userId = undefined, categoryIds = [] } = args;
    console.log(args);

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

      console.log({ a });

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
      console.log({ b });

      // User not following anyone
      if (!b.userFollowing.length) {
        console.log('User not following anyone');
        timeCall += 1;
      }

      // console.log({ b });

      let countEmpty = 0;
      while (true) {
        if (countEmpty === 2) break;

        // Following
        if (timeCall % 2 === 1) {
          a = await prisma.post.findMany({
            where: {
              userId: { in: b.userFollowing },
              categoryId: {
                hasEvery: categoryIds,
              },
              OR: [
                { postViewStatus: 'PUBLIC' },
                { postViewStatus: 'ONLY_FOLLOWERS' },
              ],
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
          console.log({ nodes }, 'in following');

          timeCall += 1;

          if (nodes.length === 0) {
            timeCall += 1;
            countEmpty += 1;
            console.log({ countEmpty });
          } else break;
        }

        // Not Following
        if (timeCall % 2 === 0) {
          console.log(
            (
              await prisma.post.findMany({
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
                },
                orderBy: [
                  {
                    createdAt: 'desc',
                  },
                  { points: 'desc' },
                ],
              })
            ).length,
            'total not following',
          );

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
          console.log({ nodes }, 'not in following');

          timeCall += 1;

          if (nodes.length === 0) {
            timeCall += 1;
            countEmpty += 1;
            console.log({ countEmpty });
          } else break;
        }
      }
    }

    console.log('return', { nodes, timeCall });
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
    let nodes;
    const after = args.after;

    let a;

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
      console.log({ follower });

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
  similarImages: async (parent, args, info) => {
    let result = [];

    // const currentImage = await prisma.post.findUnique({
    //   where: {
    //     id: args.data.postId,
    //   },
    // });

    const currentImage = await prisma.image.findUnique({
      where: {
        postId: args.data.postId,
      },
    });

    let allImages = await prisma.image.findMany();

    allImages = _.filter(allImages, (o) => o.id != currentImage.id);

    for (const img of allImages) {
      try {
        const isSimilar = await compareImages(currentImage.url, img.url);
        if (isSimilar) {
          result.push(img);
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }

    console.log(result);
    return result;
  },
};

export default postQuery;
