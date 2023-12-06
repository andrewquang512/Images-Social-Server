import { prisma } from '../../prisma/database.js';

const imageQuery = {
  allImages: async (parent, args, info) => {
    return await prisma.image.findMany();
  },

  /**
   * @param {*} parent
   * @param {{id: string}} args
   * @param {*} info
   * @returns
   */
  getImageById: async (parent, args, info) => {
    if (!args.id) {
      throw Error('Image Id is not specified');
    }

    return await prisma.image.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};

export default imageQuery;
