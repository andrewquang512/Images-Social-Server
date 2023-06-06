const Post = {
  userID: async (parent, args, { prisma }, info) => {
    console.log(parent);

    const result = await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
    return result;
  },
};

export default Post;
