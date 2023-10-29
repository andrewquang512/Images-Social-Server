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

  /**
   *
   * @param {*} parent
   * @param {{data: {storyId: string}}} args
   * @param {*} info
   * @returns
   */
  getCommentsByStoryId: async (parent, args, info) => {
    const { storyId } = args.data;
    const result = await prisma.comment.findMany({
      where: {
        storyId: storyId,
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
  // userComments: async (parent, args, { prisma }, info) => {
  //   return await prisma.post.findMany();
  // },
};

export default commentQuery;
