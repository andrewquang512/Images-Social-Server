const levelMutation = {
  updateLevel: async (parent, args, { prisma }, info) => {
    let userLevel;
    try {
      userLevel = await prisma.level.update({
        where: {
          userId: args.data.userId,
        },
        data: {
          currentXP: {
            increment: args.data.xp,
          },
        },
      });

      if (userLevel.currentXP == 100) {
        userLevel = await prisma.level.update({
          where: {
            userId: args.data.userId,
          },
          data: {
            currentXP: 0,
            currentLevel: {
              increment: 1,
            },
          },
        });
      }
    } catch (e) {
      throw e;
    }

    return userLevel;
  },
};

export default levelMutation;
