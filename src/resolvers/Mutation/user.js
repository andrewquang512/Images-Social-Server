import { prisma } from '../../prisma/database.js';

const userMutation = {
  createUser: async (parent, args, info) => {
    let user;
    try {
      user = await prisma.user.create({
        data: {
          ...args.data,
          profileImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/images.jpg',
          backgroundImageURL:
            'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/background.png',
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
      console.log(e);
      throw e;
    }
    return user;
  },
  deleteUser: async (parent, args, info) => {
    let user;
    try {
      user = await prisma.user.delete({
        where: {
          id: args.data.userId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return user;
  },
  deleteAllUser: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.user.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  //!!!!!!!!!!!!!!!!!!!!!!!
  updateUser: async (parent, args, info) => {
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
      console.log(e);
      throw e;
    }

    return updatedUser;
  },
};

export default userMutation;
