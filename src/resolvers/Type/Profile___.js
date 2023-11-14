import { prisma } from '../../prisma/database.js';

const Profile = {
  endorsements: async (parent, args, info) => {
    return await prisma.endorsement.findMany({
      where: {
        id: {
          in: parent.endorsementIds,
        },
      },
    });
  },
};

export default Profile;
