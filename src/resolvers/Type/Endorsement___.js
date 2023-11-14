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
  skillId: async (parent, args, info) => {
    return await prisma.skill.findUnique({
      where: {
        id: {
          in: parent.skillId,
        },
      },
    });
  },
};

export default Endorsement;
