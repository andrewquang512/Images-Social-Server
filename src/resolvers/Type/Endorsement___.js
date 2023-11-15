import { prisma } from '../../prisma/database.js';

const Endorsement = {
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
