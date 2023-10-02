const Tag = {
  posts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany({
      where: {
        tagId: { has: parent.id },
      },
    });
  },
};

export default Tag;
