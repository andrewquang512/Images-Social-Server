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
  userAllAlbum: async (parent, args, { prisma }, info) => {
    return await prisma.album.findMany({
      where: {
        userId: args.data.userId,
        // skip: (args.timeCall - 1) * 6,
        // take: 2,
      },
      // skip: (args.timeCall - 1) * 6,
      // take: 1,
    });
  },
};

export default albumQuery;
