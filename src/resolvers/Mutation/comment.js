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
    const {
      content,
      postId,
      storyId,
      userId,
      parentCommentId = null,
    } = args.data;

    if (!storyId && !postId) {
      throw Error('At least storyId or postId provided');
    }

    let comment;
    try {
      comment = await prisma.comment.create({
        data: {
          content: content,
          cmt_to_user: {
            connect: {
              id: userId,
            },
          },
          ...(parentCommentId && {
            parent: {
              connect: {
                id: parentCommentId,
              },
            },
          }),
          ...((postId || postId === '000000000000000000000000') && {
            cmt_to_post: {
              connect: {
                id: postId,
              },
            },
          }),
          ...((storyId || storyId === '000000000000000000000000') && {
            cmt_to_story: {
              connect: {
                id: storyId,
              },
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
   * @param {{data: {commentId: string, userId: string, action: VOTE_COMMENT_ACTION }}} args
   * @param {*} info
   * @returns
   */
  voteComment: async (parent, args, info) => {
    const { action, commentId, userId } = args.data;

    const existedComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existedComment) {
      throw Error('Comment Not Exsited');
    }

    switch (action) {
      case VOTE_COMMENT_ACTION.CANCEL:
        if (
          existedComment.downVoteUserlist.length > 0 &&
          existedComment.downVoteUserlist.includes(userId)
        ) {
          return await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: {
              votes: existedComment.votes + 1,
              downVoteUserlist: {
                set: existedComment.downVoteUserlist.filter(
                  (id) => id !== userId,
                ),
              },
            },
          });
        }

        if (
          existedComment.upVoteUserlist.length > 0 &&
          existedComment.upVoteUserlist.includes(userId)
        ) {
          return await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: {
              votes: existedComment.votes - 1,
              upVoteUserlist: {
                set: existedComment.upVoteUserlist.filter(
                  (id) => id !== userId,
                ),
              },
            },
          });
        }

        throw Error('User has not upvoted or downvoted yet');

      case VOTE_COMMENT_ACTION.DOWNVOTE:
        if (
          existedComment.downVoteUserlist.length > 0 &&
          existedComment.downVoteUserlist.includes(userId)
        ) {
          throw Error('User has downvoted this comment already');
        }

        if (
          existedComment.upVoteUserlist.length > 0 &&
          existedComment.upVoteUserlist.includes(userId)
        ) {
          return await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: {
              votes: existedComment.votes - 2,
              downVoteUserlist: {
                push: userId,
              },
              upVoteUserlist: {
                set: existedComment.upVoteUserlist.filter(
                  (id) => id !== userId,
                ),
              },
            },
          });
        }

        return await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            votes: existedComment.votes - 1,
            downVoteUserlist: {
              push: userId,
            },
          },
        });

      case VOTE_COMMENT_ACTION.UPVOTE:
        if (
          existedComment.upVoteUserlist.length > 0 &&
          existedComment.upVoteUserlist.includes(userId)
        ) {
          throw Error('User has upvoted this comment already');
        }

        if (
          existedComment.downVoteUserlist.length > 0 &&
          existedComment.downVoteUserlist.includes(userId)
        ) {
          return await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: {
              votes: existedComment.votes + 2,
              upVoteUserlist: {
                push: userId,
              },
              downVoteUserlist: {
                set: existedComment.downVoteUserlist.filter(
                  (id) => id !== userId,
                ),
              },
            },
          });
        }

        return await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            votes: existedComment.votes + 1,
            upVoteUserlist: {
              push: userId,
            },
          },
        });
      default:
        throw Error('Action should be UPVOTE, DOWNVOTE, CANCEL');
    }
  },
};

export default commentMutation;
