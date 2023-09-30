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
      },
    });
  },
};

export default albumQuery;
