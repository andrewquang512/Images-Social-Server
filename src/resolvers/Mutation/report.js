import { prisma } from '../../prisma/database.js';

const reportMutation = {
  createReport: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.report.create({
        data: {
          ...args.data,
          isFinished: false,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    return result;
  },
  deleteReport: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.report.delete({
        where: {
          id: args.data.reportId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  deleteAllReport: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.report.deleteMany({});
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

export default reportMutation;
