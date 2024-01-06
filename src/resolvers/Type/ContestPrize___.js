import { prisma } from '../../prisma/database.js';

const Contest_Prize = {
  contestId: async (parent, args, info) => {
    return await prisma.contest.findUnique({
      where: {
        id: parent.contestId,
      },
    });
  },
  userId: async (parent, args, info) => {
    let a = await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });

    console.log({ a });

    if (a === null) {
      a = {
        id: '000000000000000000000000',
        email: '',
        phoneNumber: '',
        hashPassword: '',
        name: '',
        profileImageURL: '',
        backgroundImageURL: '',
        age: 18,
        birthday: '',
        isAdmin: 0,
        createdAt: '',
        updatedAt: '',
        biography: null,
        notiIds: [],
        chatIDs: [],
        endoseredIds: [],
        interestCategoryIds: [],
        joinedContestIds: [],
      };
    }

    return a;
  },
};

export default Contest_Prize;
