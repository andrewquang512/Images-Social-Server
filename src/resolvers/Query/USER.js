import { prisma } from '../../prisma/database.js';

const userQuery = {
  allUsers: async (parent, args, info) => {
    return await prisma.user.findMany();
  },
  userInfo: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: args.data.userId,
      },
      include: {
        posts: true,
      },
    });
  },
  verifyUser: async (parent, args, info) => {
    return await prisma.user.findFirst({
      where: {
        AND: [
          { hashPassword: args.data.hashPassword },
          { email: args.data.email },
        ],
      },
    });
  },
};

export default userQuery;
