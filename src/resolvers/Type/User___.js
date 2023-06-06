const User = {
  level: async (parent, args, { prisma }, info) => {
    console.log({ parent });
    const result = await prisma.level.findUnique({
      where: {
        userId: parent.id,
      },
    });

    return result;
  },
  // comments(parent, args, { prisma }, info) {
  //   return db.comments.filter((comment) => {
  //     return comment.author === parent.id;
  //   });
  // },
};

export default User;
