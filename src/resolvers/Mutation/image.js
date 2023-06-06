const imageMutation = {
  // createImage: async (parent, args, { prisma }, info) => {
  //   const image = await prisma.image.create({
  //     data: {
  //       url: args.data.url,
  //       hash: args.data.hash,
  //     },
  //   });
  //   await prisma.post.update({
  //     where: { id: args.data.postId },
  //     data: {
  //       images: {
  //         push: image,
  //       },
  //     },
  //   });
  //   return image;
  // },
};

export default imageMutation;
