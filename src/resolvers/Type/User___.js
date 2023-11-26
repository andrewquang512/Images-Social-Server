import { prisma } from '../../prisma/database.js';

const User = {
  level: async (parent, args, info) => {
    return await prisma.level.findUnique({
      where: {
        userId: parent.id,
      },
    });
  },
  posts: async (parent, args, info) => {
    return await prisma.post.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
  stories: async (parent, args, info) => {
    return await prisma.story.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
  albums: async (parent, args, info) => {
    return await prisma.album.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
  chatIDs: async (parent, args, info) => {
    return await prisma.chat.findMany({
      where: {
        userIDs: { has: parent.id },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    });
  },
  messages: async (parent, args, info) => {
    return await prisma.chat.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
  userEndorsements: async (parent, args, info) => {
    return await prisma.endorsement.findMany({
      where: {
        ownerId: parent.id,
      },
    });
  },

  interestCategories: async (parent, args, info) => {
    return await prisma.category.findMany({
      where: {
        interestUserIds: {
          has: parent.id,
        },
      },
    });
  },
};

export default User;
