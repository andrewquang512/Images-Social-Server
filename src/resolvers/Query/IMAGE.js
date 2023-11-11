import { prisma } from '../../prisma/database.js';

const imageQuery = {
  allImages: async (parent, args, info) => {
    return await prisma.image.findMany();
  },
};

export default imageQuery;
