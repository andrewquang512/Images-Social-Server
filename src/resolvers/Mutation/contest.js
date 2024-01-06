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
    console.log({ result });

    const top3 = await prisma.post.findMany({
      where: {
        contestId,
      },
      orderBy: [
        { points: 'desc' },
        {
          createdAt: 'desc',
        },
      ],
      take: 3,
      include: {
        post_to_user: { select: { id: true } },
      },
    });

    console.log({ top3 });
    // console.log(top3[0]);

    const a = await prisma.contest_Prize.createMany({
      data: [
        {
          contestId,
          userId: top3[0]
            ? top3[0].post_to_user.id
            : '000000000000000000000000',
          title: 'First place ' + result.name,
          type: 'First',
          prizeImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/1.png',
        },
        {
          contestId,
          userId: top3[1]
            ? top3[1].post_to_user.id
            : '000000000000000000000000',
          title: 'Second place ' + result.name,
          type: 'Second',
          prizeImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/2.png',
        },
        {
          contestId,
          userId: top3[2]
            ? top3[2].post_to_user.id
            : '000000000000000000000000',
          title: 'Third place ' + result.name,
          type: 'Third',
          prizeImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/3.png',
        },
      ],
    });

    // console.log({ a });

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
