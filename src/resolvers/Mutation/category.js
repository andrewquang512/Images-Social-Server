import * as Prisma from '@prisma/client';

const categoryMutation = {
  createCategory: async (parent, args, { prisma }, info) => {
    let category;
    try {
      category = await prisma.category.create({
        data: {
          name: args.data.name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return category;
  },
};

export default categoryMutation;
