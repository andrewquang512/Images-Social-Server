const postMutation = {
  createPost: async (parent, args, { prisma }, info) => {
    let post;
    try {
      post = await prisma.post.create({
        data: {
          title: args.data.title,
          userId: args.data.userId,
          points: 0,
          image: {
            create: {
              url: args.data.imageURL,
              hash: args.data.imageHash,
              imageInfoId: {
                create: {
                  camera: 'Canon',
                  lens: 'Canon',
                  aperture: 'Canon',
                  focalLength: 'Canon',
                  shutterSpeed: 'Canon',
                  ISO: 'Canon',
                },
              },
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return post;
  },

  deletePost: async (parent, args, { prisma }, info) => {
    let post;
    try {
      post = await prisma.post.delete({
        where: {
          id: args.data.postId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return post;
  },
  deleteAllPost: async (parent, args, { prisma }, info) => {
    let result;
    try {
      result = await prisma.post.deleteMany({});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return result;
  },
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  updatePost: async (parent, args, { prisma }, info) => {
    const { updatedUser, ...updateInfo } = args.data;
    let result;
    try {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...updateInfo,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }

      throw e;
    }

    return updatedUser;
  },
};

export default postMutation;
