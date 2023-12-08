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
          notiIds: [],
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

  // TODO: Update delele User that lead to all records relate to user also be deleted
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

  /**
   * @param {*} parent
   * @param {{data: {categoryIds: string[], userId: string}}} args
   * @param {*} info
   * @returns
   */
  addInterestCategories: async (parent, args, info) => {
    const { categoryIds, userId } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        interestCategories: true,
      },
    });
    if (!user) {
      throw Error('User is not existed');
    }

    categoryIds.forEach((id) => {
      if (user.interestCategoryIds.includes(id)) {
        throw Error('User has already added this category to interest');
      }
    });

    const existedCategories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    if (existedCategories.length !== categoryIds.length) {
      throw Error('Some of category not existed');
    }

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        interestCategories: {
          connect: categoryIds.map((id) => {
            return {
              id: id,
            };
          }),
        },
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{data: {categoryIds: string, userId: string}}} args
   * @param {*} info
   * @returns
   */
  removeInterestCategories: async (parent, args, info) => {
    const { categoryIds, userId } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        interestCategories: true,
      },
    });
    if (!user) {
      throw Error('User is not existed');
    }

    categoryIds.forEach((id) => {
      if (!user.interestCategoryIds.includes(id)) {
        throw Error('User has not added this category to interest');
      }
    });

    const existedCategories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    if (existedCategories.length !== categoryIds.length) {
      throw Error('Some of category not existed');
    }

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        interestCategories: {
          disconnect: categoryIds.map((id) => {
            return {
              id: id,
            };
          }),
        },
      },
    });
  },
};

export default userMutation;
