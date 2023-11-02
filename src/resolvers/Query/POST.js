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
  getNewFeed: async (parent, args, info) => {
    let a, nodes;
    const after = args.after;

    if (!after) {
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

      nodes = a.slice(0, 2).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      // console.log({ nodes });
    } else {
      const b = await prisma.following.findUnique({
        where: {
          userId: args.userId,
        },
      });

      console.log({ b });
      console.log(args);

      console.log(args.timeCall);

      if (args.timeCall % 2 === 1) {
        a = await prisma.post.findMany({
          where: {
            userId: { in: b.userFollowing },
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
          skip: (args.timeCall - 1) * 6,
          take: 6,
        });

        nodes = _.shuffle(a).map((post) => ({
          node: post,
          cursor: post.id,
        }));
        console.log({ nodes });
      } else {
        a = await prisma.post.findMany({
          where: {
            userId: { notIn: b.userFollowing },
            postViewStatus: 'PUBLIC',
          },
          orderBy: [
            {
              createdAt: 'desc',
            },
            { points: 'desc' },
          ],
          skip: (args.timeCall - 2) * 3,
          take: 3,
        });

        nodes = _.shuffle(a).map((post) => ({
          node: post,
          cursor: post.id,
        }));
        console.log({ nodes });
      }
    }

    return {
      edges: nodes,
      pageInfo: {
        hasNextPage: nodes.length ? true : false,
        hasPreviousPage: after ? true : false,
        // startCursor,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
    };
  },
  getAllUserPosts: async (parent, args, info) => {
    let nodes;
    const after = args.after;

    let a = await prisma.post.findMany({
      where: {
        userId: args.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

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

    allImages.map(async (img) => {
      if (compareImages(currentImage.url, img.url)) {
        result.push(img);
      }
    });

    console.log(result);
    return result;
  },
};

export default postQuery;
