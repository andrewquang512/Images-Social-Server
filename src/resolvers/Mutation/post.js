const postMutation = {
  createPost: async (parent, args, { prisma }, info) => {
    const post = await prisma.post.create({
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

    const a = await prisma.user.update({
      where: {
        id: args.data.userId,
      },
      data: {
        // posts: {
        //   connect: {
        //     // id: post.id,
        //   },
        // },
      },
      include: {
        posts: true,
      },
    });
    console.log(a);

    return post;
  },
};

export default postMutation;
