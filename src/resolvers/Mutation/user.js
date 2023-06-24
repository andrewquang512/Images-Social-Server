import { Prisma } from '@prisma/client';

const userMutation = {
  createUser: async (parent, args, { prisma }, info) => {
    let user;
    try {
      user = await prisma.user.create({
        data: {
          ...args.data,
          profileImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/images.jpg',
          birthday: '2000-01-01',
          phoneNumber: '',
          isAdmin: 0,
          age: 18,
          level: {
            create: {
              currentXP: 0,
              currentLevel: 1,
            },
          },
          followers: {
            create: {
              userFollower: [],
            },
          },
          followings: {
            create: {
              userFollowing: [],
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }

      throw e;
    }
    return user;
  },
  deleteUser: async (parent, args, { prisma }, info) => {
    let user;
    try {
      user = await prisma.user.delete({
        where: {
          id: args.data.userId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return user;
  },
  deleteAllUser: async (parent, args, { prisma }, info) => {
    let result;
    try {
      result = await prisma.user.deleteMany({});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return result;
  },
  //!!!!!!!!!!!!!!!!!!!!!!!
  updateUser: async (parent, args, { prisma }, info) => {
    const { userId, ...updateInfo } = args.data;
    let updatedUser;
    try {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...updateInfo,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return updatedUser;
  },
};

export default userMutation;
