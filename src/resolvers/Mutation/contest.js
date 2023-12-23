import { prisma } from '../../prisma/database.js';

const contestMutation = {
  /**
   * @param {*} parent
   * @param {{data: {name: string, prizeImageURL: string }}} args
   * @param {*} info
   * @returns
   */
  // createPrize: async (parent, args, info) => {
  //   const { name, prizeImageURL } = args.data;
  //   return prisma.prize.create({
  //     data: {
  //       name: name,
  //       prizeImageURL: prizeImageURL,
  //     },
  //   });
  // },

  /**
   * @param {*} parent
   * @param {{data: {name: string, contestImageURL: string, description: string, startDate: number, endDate: number, contestPrizeList: CreateContestPrizeInput[]}}} args
   * @typedef {{prizeId: string, type: string, title: string}} CreateContestPrizeInput
   * @param {*} info
   * @returns
   */
  createContest: async (parent, args, info) => {
    const { data } = args;

    const result = await prisma.contest.create({
      data: {
        name: data.name,
        contestImageURL: data.contestImageURL,
        description: data.description,
        isFinished: false,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });

    return result;
  },
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  endContest: async (parent, args, info) => {
    const { contestId } = args.data;

    const result = await prisma.contest.update({
      where: {
        id: contestId,
      },
      data: {
        isFinished: true,
      },
    });

    const users = await prisma.post.findMany({
      where: {
        contestId: contestId,
      },
      orderBy: [
        { points: 'desc' },
        {
          createdAt: 'desc',
        },
      ],
      take: 3,
      include: {
        userId: {
          id: true,
        },
      },
    });

    console.log({ users });

    // await prisma.contest_Prize.create({
    //   data: {
    //     contestId: contestId,
    //   },
    // });

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
          joinedUserIds: {
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
