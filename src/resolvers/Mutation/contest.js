import { prisma } from '../../prisma/database.js';

const contestMutation = {
  createContest: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.contest.create({
        data: {
          ...args.data,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    return result;
  },
  deleteContest: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.contest.delete({
        where: {
          id: args.data.contestId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  deleteAllContest: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.contest.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  //!!!!!!!!!!!!!!!!!!!!!!!
  //   updateUser: async (parent, args, info) => {
  //     const { userId, ...updateInfo } = args.data;
  //     let updatedUser;
  //     try {
  //       updatedUser = await prisma.user.update({
  //         where: {
  //           id: userId,
  //         },
  //         data: {
  //           ...updateInfo,
  //         },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //       throw e;
  //     }

  //     return updatedUser;
  //   },
};

export default contestMutation;
