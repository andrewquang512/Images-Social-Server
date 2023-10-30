import { prisma } from '../../prisma/database.js';

const Category = {
  posts: async (parent, args, info) => {
    return await prisma.post.findMany({
      where: {
        categoryId: { has: parent.id },
      },
    });
  },
};

export default Category;
