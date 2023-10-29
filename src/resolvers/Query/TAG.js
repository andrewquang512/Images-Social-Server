import { prisma } from '../../prisma/database.js';

const tagQuery = {
  allTags: async (parent, args, info) => {
    return await prisma.tag.findMany();
  },
  tagInfo: async (parent, args, info) => {
    return await prisma.category.findUnique({
      where: {
        id: args.data.tag.toLowerCase(),
      },
    });
  },
};

export default tagQuery;
