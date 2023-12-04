import { prisma } from '../../prisma/database.js';

const contestMutation = {
  /**
   * @param {*} parent
   * @param {{data: {name: string, prizeImageURL: string }}} args
   * @param {*} info
   * @returns
   */
  createPrize: async (parent, args, info) => {
    const { name, prizeImageURL } = args.data;
    return prisma.prize.create({
      data: {
        name: name,
        prizeImageURL: prizeImageURL,
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{data: {name: string, contestImageURL: string, description: string, startDate: number, endDate: number, contestPrizeList: CreateContestPrizeInput[]}}} args
   * @typedef {{prizeId: string, type: string, title: string}} CreateContestPrizeInput
   * @param {*} info
   * @returns
   */
  createContest: async (parent, args, info) => {
    const { data } = args;
    const { contestPrizeList } = data;
    const result = await prisma.contest.create({
      data: {
        name: data.name,
        contestImageURL: data.contestImageURL,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        contestPrizeList: {
          create: contestPrizeList.map((each) => {
            return {
              prize: {
                connect: {
                  id: each.prizeId,
                },
              },
              type: each.type,
              title: each.title,
            };
          }),
        },
      },
    });

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

  joinContest: async (parent, args, info) => {
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
