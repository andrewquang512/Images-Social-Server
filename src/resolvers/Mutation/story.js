import { prisma } from '../../prisma/database.js';

const storyMutation = {
  createStory: async (parent, args, info) => {
    let story;
    try {
      story = await prisma.story.create({
        data: {
          userId: args.data.userId,
          title: args.data.title,
          storyViewStatus: args.data.storyViewStatus,
          content: args.data.content,
          images: args.data.images,
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
  deleteStory: async (parent, args, info) => {
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
  deleteAllStory: async (parent, args, info) => {
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
  // updatePost: async (parent, args, info) => {
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
  interactStory: async (parent, args, info) => {
    let story;

    if (args.data.isLiked) {
      try {
        story = await prisma.story.update({
          where: {
            id: args.data.storyId,
          },
          data: {
            points: {
              increment: 1,
            },
            userLikedStory: {
              push: args.data.likedUserId,
            },
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);
        }
        throw e;
      }
    } else {
      try {
        const { userLikedStory } = await prisma.story.findUnique({
          where: {
            id: args.data.storyId,
          },
        });
        console.log(userLikedStory);

        story = await prisma.story.update({
          where: {
            id: args.data.storyId,
          },
          data: {
            points: {
              increment: -1,
            },
            userLikedStory: {
              set: userLikedStory.filter((id) => id !== args.data.likedUserId),
            },
          },
        });

        if (story.points == -1) {
          story = await prisma.post.update({
            where: {
              id: args.data.storyId,
            },
            data: {
              points: 0,
            },
          });
        }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);
        }
        throw e;
      }
    }

    return story;
  },
};

export default storyMutation;
