const postMutation = {
  createPost: async (parent, args, { prisma }, info) => {
    const post = await prisma.post.create({
      data: {
        title: args.data.title,
        userId: args.data.userId,
        points: 0,
      },
    });

    await prisma.user.update({
      where: {
        id: args.data.userId,
      },
      data: {
        posts: {
          connect: {
            id: post.id,
          },
        },
      },
      // include: {
      //   posts: true,
      // },
    });
    // console.log(a);

    const image = await prisma.image.create({
      data: {
        url: args.data.imageURL,
        hash: args.data.imageHash,
        postId: post.id,
      },
    });

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        image: {
          connect: {
            id: image.id,
          },
        },
      },
      // include: {
      //   image: true,
      // },
    });
    // console.log(b);

    const imageInfo = await prisma.imageinfo.create({
      data: {
        url: args.data.imageURL,
        hash: args.data.imageHash,
        postId: post.id,
      },
    });

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        image: {
          connect: {
            id: image.id,
          },
        },
      },
      // include: {
      //   image: true,
      // },
    });
    // console.log(b);

    return post;
  },
  // deletePost(parent, args, { db }, info) {
  //   const postIndex = db.posts.findIndex((post) => post.id === args.id);

  //   if (postIndex === -1) {
  //     throw new Error('Post not found');
  //   }

  //   const deletedPosts = db.posts.splice(postIndex, 1);

  //   db.comments = db.comments.filter((comment) => comment.post !== args.id);

  //   return deletedPosts[0];
  // },
  // updatePost(parent, args, { db }, info) {
  //   const { id, data } = args;
  //   const post = db.posts.find((post) => post.id === id);

  //   if (!post) {
  //     throw new Error('Post not found');
  //   }

  //   if (typeof data.title === 'string') {
  //     post.title = data.title;
  //   }

  //   if (typeof data.body === 'string') {
  //     post.body = data.body;
  //   }

  //   if (typeof data.published === 'boolean') {
  //     post.published = data.published;
  //   }

  //   return post;
  // },
};

export default postMutation;
