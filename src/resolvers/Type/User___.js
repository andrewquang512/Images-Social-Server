const User = {
  level: async (parent, args, { prisma }, info) => {
    const result = await prisma.level.findUnique({
      where: {
        userId: parent.id,
      },
    });

    return result;
  },
  posts: async (parent, args, { prisma }, info) => {
    const result = await prisma.post.findMany({
      where: {
        userId: parent.id,
      },
    });

    return result;
  },
};

export default User;
