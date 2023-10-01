const postQuery = {
  allPosts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany();
  },
  postInfo: async (parent, args, { prisma }, info) => {
    return await prisma.post.findUnique({
      where: {
        id: args.data.postId,
      },
    });
  },
  getNewFeed: async (parent, args, { prisma }, info) => {
    let nodes;
    const after = args.after;
    // console.log({ after });

    let a = await prisma.post.findMany({
      where: {
        userId: args.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!after) {
      nodes = a.slice(0, 2).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      console.log({ nodes });
    } else {
      console.log('in after');
      const index = a.findIndex((post) => post.id === after);
      nodes = a.slice(index + 1, index + 3).map((post) => ({
        node: post,
        cursor: post.id,
      }));

      console.log({ nodes });
    }

    const hasNextPage =
      nodes.length === 0
        ? false
        : nodes.slice(-1)[0].cursor !== a.slice(-1)[0].id;
    // console.log(nodes.slice(-1));
    console.log({ hasNextPage });

    return {
      edges: nodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after ? true : false,
        // startCursor,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
    };
  },
};

export default postQuery;
