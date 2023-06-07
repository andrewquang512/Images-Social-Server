const postQuery = {
  allPosts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany();
  },
  // post
};

export default postQuery;
