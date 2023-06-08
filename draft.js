const post = await prisma.user.update({
  where: {
    id: args.data.userId,
  },
  data: {
    posts: {
      create: {
        title: args.data.title,
        points: 0,
      },
    },
  },
  include: {
    posts: true, // Include all posts in the returned object
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
