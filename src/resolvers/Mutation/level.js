import { prisma } from '../../prisma/database.js';

const levelMutation = {
  // ! Ko can dung createLevel, da lam trong create user
  updateLevel: async (parent, args, info) => {
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

      if (userLevel.currentXP >= 100) {
        userLevel = await prisma.level.update({
          where: {
            userId: args.data.userId,
          },
          data: {
            currentXP: userLevel.currentXP - 100,
            currentLevel: {
              increment: 1,
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
      throw e;
    }

    return userLevel;
  },
};

export default levelMutation;
