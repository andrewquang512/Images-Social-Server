const Image = {
  postId: async (parent, args, { prisma }, info) => {
    return await prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    });
  },
  imageInfoId: async (parent, args, { prisma }, info) => {
    return await prisma.imageInfo.findUnique({
      where: {
        imageId: parent.id,
      },
    });
  },
};

export default Image;
