const storyQuery = {
  allStories: async (parent, args, { prisma }, info) => {
    return await prisma.story.findMany();
  },
};

export default storyQuery;
