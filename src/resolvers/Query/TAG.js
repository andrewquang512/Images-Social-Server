import { prisma } from '../../prisma/database.js';

const tagQuery = {
  allTags: async (parent, args, info) => {
    return await prisma.tag.findMany();
  },
  suggestTags: async (parent, args, info) => {
    const a = await prisma.tag.findMany();
    return a.slice(0, 10);
  },
  tagInfo: async (parent, args, info) => {
    return await prisma.tag.findUnique({
      where: {
        name: args.data.tag.toLowerCase(),
      },
    });
  },
};

export default tagQuery;
