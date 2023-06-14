const Comment = {
  userId: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  postId: async (parent, args, { prisma }, info) => {
    return await prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    });
  },
};

export default Comment;
