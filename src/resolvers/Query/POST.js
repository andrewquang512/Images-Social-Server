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
    let nodes, startCursor, endCursor;
    const offset = args.data.offset;
    console.log({ offset });

    if (offset === 0) {
      let a = await prisma.post.findMany({
        where: {
          userId: args.data.userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      nodes = a.slice(0, 2).map((post, idx, array) => ({
        node: post,
        cursor: array[idx + 1] ? array[idx + 1].id : '64ec7d0450f027476c9df225',
      }));

      console.log({ nodes });
    } else {
      let a = await prisma.post.findMany({
        where: {
          userId: args.data.userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      nodes = a.slice(offset, offset + 2).map((post, idx, array) => ({
        // nodes = a.slice(2, 4).map((post, idx, array) => ({
        node: post,
        cursor: array[idx + 1] ? array[idx + 1].id : 'end',
      }));

      console.log({ nodes });
    }

    return {
      edges: nodes,
      pageInfo: {
        hasNextPage: offset ? false : true,
        hasPreviousPage: offset ? true : false,
        startCursor: nodes[0].node.id,
        endCursor: nodes.slice(-1)[0].node.id,
      },
    };
  },
};

export default postQuery;
