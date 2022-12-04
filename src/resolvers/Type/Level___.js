const Level = {
  user: async (parent, args, { prisma }, info) => {
    const result = await prisma.user.findUnique({
      where: {
        id: parent.userID,
      },
    });
    return result;
  },
};

export default Level;
