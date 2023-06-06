const commentMutation = {
  // createComment(parent, args, { db }, info) {
  //   const comment = await prisma.level.create({
  //     data: {
  //       ...args.data,
  //       currentXP: 0,
  //       currentLevel: 0,
  //     },
  //   });
  //   await prisma.post.update({
  //     where: { id: args.data.postId },
  //     data: {
  //       cmts: {
  //         push: comment,
  //       },
  //     },
  //   });
  //   await prisma.user.update({
  //     where: { id: args.data.userId },
  //     data: {
  //       comments: {
  //         push: comment,
  //       },
  //     },
  //   });
  //   return { comment };
  // },
  // deleteComment(parent, args, { db }, info) {
  //   const commentIndex = db.comments.findIndex(
  //     (comment) => comment.id === args.id,
  //   );
  //   if (commentIndex === -1) {
  //     throw new Error('Comment not found');
  //   }
  //   const deletedComments = db.comments.splice(commentIndex, 1);
  //   return deletedComments[0];
  // },
  // updateComment(parent, args, { db }, info) {
  //   const { id, data } = args;
  //   const comment = db.comments.find((comment) => comment.id === id);
  //   if (!comment) {
  //     throw new Error('Comment not found');
  //   }
  //   if (typeof data.text === 'string') {
  //     comment.text = data.text;
  //   }
  //   return comment;
  // },
};

module.exports = commentMutation;
