const levelMutation = {
  // ! Ko can dung, da lam trong create user
  // createLevel
  //!!!
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
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   console.log(e);
      // }
      throw e;
    }

    return userLevel;
  },
};

export default levelMutation;
