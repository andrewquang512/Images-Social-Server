const ImageInfo = {
  imageId: async (parent, args, { prisma }, info) => {
    return await prisma.image.findUnique({
      where: {
        id: parent.imageId,
      },
    });
  },
};

export default ImageInfo;
