import { prisma } from '../../prisma/database.js';

const contestMutation = {
  createContest: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.contest.create({
        data: {
          ...args.data,
          userJoined: [],
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
  userJoinContest: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.contest.update({
        where: {
          id: args.data.contestId,
        },
        data: {
          userJoined: {
            push: args.data.userId,
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
};

export default contestMutation;
