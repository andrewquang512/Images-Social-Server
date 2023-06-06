const postQuery = {
  allPosts: async (parent, args, { prisma }, info) => {
    const result = await prisma.post.findMany();
    return result;
  },
};

export default postQuery;
