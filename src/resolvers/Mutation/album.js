import { Prisma } from '@prisma/client';

const albumMutation = {
  createAlbum: async (parent, args, { prisma }, info) => {
    let album;
    try {
      album = await prisma.album.create({
        data: {
          userId: args.data.userId,
          name: args.data.name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return album;
  },
};

export default albumMutation;
