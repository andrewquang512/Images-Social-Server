import { prisma } from '../../prisma/database.js';

const categoryQuery = {
  allCategories: async (parent, args, info) => {
    return await prisma.category.findMany();
  },
  categoryInfo: async (parent, args, info) => {
    return await prisma.category.findUnique({
      where: {
        id: args.data.categoryId,
      },
    });
  },
};

export default categoryQuery;
