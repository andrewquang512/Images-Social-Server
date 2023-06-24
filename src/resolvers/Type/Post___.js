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
  categoryId: async (parent, args, { prisma }, info) => {
    return await prisma.category.findUnique({
      where: {
        id: parent.categoryId,
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
