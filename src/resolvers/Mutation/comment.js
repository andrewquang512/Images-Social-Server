import { prisma } from '../../prisma/database.js';
import { VOTE_COMMENT_ACTION } from '../../constants.js';

const commentMutation = {
  /**
   * 
   * @param {*} parent 
   * @param {{data: {content: string, userId: string, postId: string, storyId: string, parentCommentId: string}}} args 
   * @param {*} info 
   * @returns 
   */
  createComment: async (parent, args, info) => {
    const { content, postId, storyId, userId, parentCommentId = null } = args.data

    if (!storyId && !postId) {
      throw Error('At least storyId or postId provided')
    }

    let comment;
    try {
      comment = await prisma.comment.create({
        data: {
          content: content,
          cmt_to_user: {
            connect: {
              id: userId
            }
          },
          ...(parentCommentId && {
            parent: {
              connect: {
                id: parentCommentId
              }
            },
          }),
          ...((postId || postId === '000000000000000000000000') && {
            cmt_to_post: {
              connect: {
                id: postId
              }
            },
          }),
          ...((storyId || storyId === '000000000000000000000000') && {
            cmt_to_story: {
              connect: {
                id: storyId
              }
            },
          }),
        },

      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    return comment;
  },

  deleteComment: async (parent, args, info) => {
    let comment;
    try {
      comment = await prisma.comment.delete({
        where: {
          id: args.data.commentId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return comment;
  },

  updateComment: async (parent, args, info) => {
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
  voteComment: async (parent, args, info) => {
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
