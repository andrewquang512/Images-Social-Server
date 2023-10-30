import { prisma } from '../../prisma/database.js';

const Story = {
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  comments: async (parent, args, info) => {
    return await prisma.comment.findMany({
      where: {
        storyId: parent.id,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
};

export default Story;
