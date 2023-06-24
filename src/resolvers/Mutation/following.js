const followingMutation = {
  updateFollowing: async (parent, args, { prisma }, info) => {
    let userFollowing;
    try {
      userFollowing = await prisma.following.update({
        where: {
          userId: args.data.userId,
        },
        data: {
          userFollowing: {
            push: args.data.followingId,
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return userFollowing;
  },
};

export default followingMutation;
