const imageQuery = {
  allImages: async (parent, args, { prisma }, info) => {
    return await prisma.image.findMany();
  },
};

export default imageQuery;
