const storyQuery = {
  allStories: async (parent, args, { prisma }, info) => {
    return await prisma.story.findMany();
  },
  storyInfo: async (parent, args, { prisma }, info) => {
    return await prisma.story.findUnique({
      where: {
        id: args.data.storyId,
      },
    });
  },
};

export default storyQuery;
