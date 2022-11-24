const imageQuery = {
  allImages: async (parent, args, { prisma }, info) => {
    const result = await prisma.image.findMany();
    return result;
  },
};

export default imageQuery;
