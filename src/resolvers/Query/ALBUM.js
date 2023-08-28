const albumQuery = {
  allAlbums: async (parent, args, { prisma }, info) => {
    return await prisma.album.findMany();
  },
  albumInfo: async (parent, args, { prisma }, info) => {
    return await prisma.album.findUnique({
      where: {
        id: args.data.albumId,
      },
    });
  },
  userAllAlbumInfo: async (parent, args, { prisma }, info) => {
    return await prisma.album.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default albumQuery;
