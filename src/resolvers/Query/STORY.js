import { DEFAULT_LIMIT } from '../../constants.js';
import { prisma } from '../../prisma/database.js';

const storyQuery = {
  allStories: async (parent, args, info) => {
    try {
      return await prisma.story.findMany();
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  getNewStories: async (parent, args, info) => {
    const { limit, after } = args;

    try {
      return await prisma.story.findMany({
        take: limit || DEFAULT_LIMIT,
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  storyInfo: async (parent, args, info) => {
    return await prisma.story.findUnique({
      where: {
        id: args.data.storyId,
      },
    });
  },
};

export default storyQuery;
