import { prisma } from '../../prisma/database.js';

const Post = {
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  image: async (parent, args, info) => {
    return await prisma.image.findUnique({
      where: {
        postId: parent.id,
      },
    });
  },
  categoryId: async (parent, args, info) => {
    return await prisma.category.findMany({
      where: {
        id: { in: parent.categoryId },
      },
    });
  },
  albumId: async (parent, args, info) => {
    return await prisma.album.findMany({
      where: {
        id: { in: parent.albumId },
      },
    });
  },
  // tagId: async (parent, args, info) => {
  //   return await prisma.tag.findMany({
  //     where: {
  //       name: { in: parent.tagId },
  //     },
  //   });
  // },
  comments: async (parent, args, info) => {
    const result = await prisma.comment.findMany({
      where: {
        postId: parent.id,
        parent: null,
      },
      include: {
        child: {
          include: {
            child: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  },
};

export default Post;
