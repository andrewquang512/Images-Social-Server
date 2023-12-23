import { prisma } from '../../prisma/database.js';

const ImageInfo = {
  imageId: async (parent, args, info) => {
    return await prisma.image.findUnique({
      where: {
        id: parent.imageId,
      },
    });
  },
};

export default ImageInfo;
