import { prisma } from '../../prisma/database.js';

const Image = {
  postConnection: async (parent, args, info) => {
    return await prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    });
  },
  imageInfoId: async (parent, args, info) => {
    return await prisma.imageInfo.findUnique({
      where: {
        imageId: parent.id,
      },
    });
  },
};

export default Image;
