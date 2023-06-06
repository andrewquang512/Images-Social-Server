const postMutation = {
  createPost: async (parent, args, { prisma }, info) => {
    const post = await prisma.post.create({
      data: {
        ...args.data,
        points: 0,
        content: {},
        images: {},
        cmts: {},
      },
    });

    await prisma.user.update({
      where: { id: args.data.userId },
      data: {
        posts: {
          push: post,
        },
      },
    });

    // await prisma.image.create({
    //   data: {
    //     postId: post.id,
    //   },
    // });

    return { post };
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
