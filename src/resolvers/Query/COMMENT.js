import { prisma } from '../../prisma/database.js';

const commentQuery = {
  /**
   *
   * @param {*} parent
   * @param {{data: {postId: string}}} args
   * @param {*} info
   * @returns
   */
  getCommentsByPostId: async (parent, args, info) => {
    const { postId } = args.data;
    const result = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      // Wrong
      // orderBy: {
      //   votes: 'desc',
      // },
    });

    // Sort By Desc
    const sorted = result.sort((before, after) => after.votes - before.votes);
    return sorted;
  },
  // userComments: async (parent, args, info) => {
  //   return await prisma.post.findMany();
  // },
};

export default commentQuery;
