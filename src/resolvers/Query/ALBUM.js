import { prisma } from '../../prisma/database.js';

const albumQuery = {
  allAlbums: async (parent, args, info) => {
    return await prisma.album.findMany();
  },
  albumInfo: async (parent, args, info) => {
    const { currentUserId, userId, albumId } = args.data;

    if (currentUserId === userId) {
      return await prisma.post.findMany({
        where: {
          albumId: { has: albumId },
        },
      });
    } else {
      const follower = await prisma.follower.findUnique({
        where: {
          userId: userId,
        },
      });

      if (follower.userFollower.includes(currentUserId)) {
        let a = await prisma.post.findMany({
          where: {
            albumId: { has: albumId },
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
        return a;
      } else {
        let a = await prisma.post.findMany({
          where: {
            albumId: { has: albumId },
            OR: [{ postViewStatus: 'PUBLIC' }],
          },

          orderBy: {
            createdAt: 'desc',
          },
        });

        console.log({ a });
        return a;
      }
    }
  },
  userAllAlbum: async (parent, args, info) => {
    return await prisma.album.findMany({
      where: {
        userId: args.data.userId,
      },
    });
  },
  postNotInAlbum: async (parent, args, info) => {
    return await prisma.post.findMany({
      where: {
        userId: args.data.userId,
        NOT: {
          albumId: { has: args.data.albumId },
        },
      },
    });
  },
};

export default albumQuery;
