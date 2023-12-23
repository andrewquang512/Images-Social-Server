import { prisma } from '../../prisma/database.js';

const Endorsement = {
  owner: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.ownerId,
      },
    });
  },
  endorsers: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: {
          in: parent.endorserIds,
        },
      },
    });
  },
  skill: async (parent, args, info) => {
    return await prisma.skill.findUnique({
      where: {
        id: parent.skillId,
      },
    });
  },
};

export default Endorsement;
