const User = {
  level: async (parent, args, { prisma }, info) => {
    return await prisma.level.findUnique({
      where: {
        userId: parent.id,
      },
    });
  },
  posts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
};

export default User;
