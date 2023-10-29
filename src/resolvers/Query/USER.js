import _ from 'lodash';

const userQuery = {
  allUsers: async (parent, args, { prisma }, info) => {
    return await prisma.user.findMany({});
  },
  userInfo: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: args.data.userId,
      },
      include: {
        posts: true,
      },
    });
  },
  verifyUser: async (parent, args, { prisma }, info) => {
    return await prisma.user.findFirst({
      where: {
        AND: [
          { hashPassword: args.data.hashPassword },
          { email: args.data.email },
        ],
      },
    });
  },
  suggestUserToFollow: async (parent, args, { prisma }, info) => {
    const a = await prisma.user.findMany({
      where: {
        id: { not: args.data.userId },
        isAdmin: 0,
      },
    });

    const b = await prisma.following.findUnique({
      where: {
        userId: args.data.userId,
      },
    });

    // console.log({ a });
    // console.log({ b });

    const c = a.filter((elem) => !b.userFollowing.find((id) => elem.id === id));

    console.log({ c });

    if (c.length > 3) {
      return _.sampleSize(c, 3);
    } else {
      return c;
    }
  },
};

export default userQuery;
