const postQuery = {
  allPosts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany();
  },
  postInfo: async (parent, args, { prisma }, info) => {
    return await prisma.post.findUnique({
      where: {
        id: args.data.postId,
      },
    });
  },
};

export default postQuery;
