const Post = {
  userId: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  image: async (parent, args, { prisma }, info) => {
    return await prisma.image.findUnique({
      where: {
        postId: parent.id,
      },
    });
  },
  comments: async (parent, args, { prisma }, info) => {
    return await prisma.comment.findMany({
      where: {
        postId: parent.id,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
};

export default Post;
