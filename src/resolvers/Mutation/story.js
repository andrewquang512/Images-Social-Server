import { Prisma } from '@prisma/client';

const storyMutation = {
  createStory: async (parent, args, { prisma }, info) => {
    let story;
    try {
      story = await prisma.story.create({
        data: {
          userId: args.data.userId,
          title: args.data.title,
          content: args.data.content,
          points: 0,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return story;
  },
  deleteStory: async (parent, args, { prisma }, info) => {
    let story;
    try {
      story = await prisma.story.delete({
        where: {
          id: args.data.storyId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return story;
  },
  deleteAllStory: async (parent, args, { prisma }, info) => {
    let result;
    try {
      result = await prisma.story.deleteMany({});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return result;
  },
  // //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // updatePost: async (parent, args, { prisma }, info) => {
  //   const { updatedUser, ...updateInfo } = args.data;
  //   let result;
  //   try {
  //     updatedUser = await prisma.user.update({
  //       where: {
  //         id: userId,
  //       },
  //       data: {
  //         ...updateInfo,
  //       },
  //     });
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       console.log(e);
  //     }

  //     throw e;
  //   }

  //   return updatedUser;
  // },
};

export default storyMutation;
