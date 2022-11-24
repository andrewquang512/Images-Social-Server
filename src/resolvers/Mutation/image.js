const imageMutation = {
  createImage: async (parent, args, { prisma }, info) => {
    const result = await prisma.image.create({
      data: {
        url: args.data.url,
        hash: args.data.hash,
      },
    });

    return result;
  },
};

export default imageMutation;
