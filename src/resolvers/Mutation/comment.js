import * as Prisma from '@prisma/client';
import { VOTE_COMMENT_ACTION } from '../../constants.js';
const commentMutation = {
  createComment: async (parent, args, { prisma }, info) => {
    let comment;
    try {
      comment = await prisma.comment.create({
        data: {
          content: args.data.content,
          userId: args.data.userId,
          postId: args.data.postId,
          storyId: args.data.storyId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }
    return comment;
  },
  deleteComment: async (parent, args, { prisma }, info) => {
    let comment;
    try {
      comment = await prisma.comment.delete({
        where: {
          id: args.data.commentId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return comment;
  },
  updateComment: async (parent, args, { prisma }, info) => {
    return await prisma.comment.update({
      where: {
        id: args.data.commentId,
      },
      data: {
        content: args.data.content,
      },
    });
  },

  /**
   *
   * @param {*} parent
   * @param {{data: {commentId: string, action: UPVOTE | DOWNVOTE}}} args
   * @param {*} info
   * @returns
   */
  voteCommand: async (parent, args, { prisma }, info) => {
    const { action, commentId } = args.data;

    const existedComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existedComment) {
      throw Error('Comment Not Exsited');
    }

    switch (action) {
      case VOTE_COMMENT_ACTION.DOWNVOTE:
        return await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            votes: existedComment.votes - 1,
          },
        });

      case VOTE_COMMENT_ACTION.UPVOTE:
        return await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            votes: existedComment.votes + 1,
          },
        });
      default:
        throw Error('Action should be UPVOTE or DOWNVOTE');
    }
  },
};

export default commentMutation;
