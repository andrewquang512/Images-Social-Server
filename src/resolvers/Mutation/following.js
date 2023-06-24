const followingMutation = {
  updateFollowing: async (parent, args, { prisma }, info) => {
    let user;
    let followedUser;

    try {
      user = await prisma.following.findUnique({
        where: {
          userId: args.data.userId,
        },
      });

      followedUser = await prisma.follower.findUnique({
        where: {
          userId: args.data.followingId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    if (user.userFollowing.indexOf(args.data.followingId) === -1) {
      user.userFollowing.push(args.data.followingId);
      followedUser.userFollower.push(args.data.userId);
    }

    try {
      user = await prisma.following.update({
        where: {
          userId: args.data.userId,
        },
        data: {
          userFollowing: user.userFollowing,
        },
      });

      await prisma.follower.update({
        where: {
          userId: args.data.followingId,
        },
        data: {
          userFollower: followedUser.userFollower,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return user;
  },
  unfollowUser: async (parent, args, { prisma }, info) => {
    let user;
    let followedUser;

    try {
      user = await prisma.following.findUnique({
        where: {
          userId: args.data.userId,
        },
      });

      followedUser = await prisma.follower.findUnique({
        where: {
          userId: args.data.followingId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    const idx = user.userFollowing.indexOf(args.data.followingId);
    if (idx > -1) {
      user.userFollowing.splice(idx, 1);

      followedUser.userFollower.splice(
        followedUser.userFollower.indexOf(args.data.userId),
        1,
      );
    }

    try {
      user = await prisma.following.update({
        where: {
          userId: args.data.userId,
        },
        data: {
          userFollowing: user.userFollowing,
        },
      });

      await prisma.follower.update({
        where: {
          userId: args.data.followingId,
        },
        data: {
          userFollower: followedUser.userFollower,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return user;
  },
};

export default followingMutation;
