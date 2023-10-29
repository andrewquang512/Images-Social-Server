const commentQuery = {
  /**
   *
   * @param {*} parent
   * @param {{data: {postId: string}}} args
   * @param {*} info
   * @returns
   */
  getCommentsByPostId: async (parent, args, { prisma }, info) => {
    const { postId } = args.data;
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        votes: 'desc',
      },
    });
  },
  // userComments: async (parent, args, { prisma }, info) => {
  //   return await prisma.post.findMany();
  // },
};

export default commentQuery;
