const Image = {
  postId: async (parent, args, { prisma }, info) => {
    return await prisma.post.findUnique({
      where: {
        id: parent.id,
      },
    });
  },
  imageInfoId: async (parent, args, { prisma }, info) => {
    return await prisma.imageinfo.findUnique({
      where: {
        imageId: parent.id,
      },
    });
  },
};

export default Image;
