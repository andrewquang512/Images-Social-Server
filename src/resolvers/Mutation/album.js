import { prisma } from '../../prisma/database.js';

const albumMutation = {
  createAlbum: async (parent, args, info) => {
    let album;
    try {
      album = await prisma.album.create({
        data: {
          userId: args.data.userId,
          name: args.data.name,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return album;
  },
  deleteAlbum: async (parent, args, info) => {
    let album;
    try {
      album = await prisma.album.delete({
        where: {
          id: args.data.albumId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return album;
  },
  deleteAllAlbum: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.album.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  updateAlbum: async (parent, args, info) => {
    const { updatedUser, ...updateInfo } = args.data;
    let result;
    try {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...updateInfo,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return updatedUser;
  },
};

export default albumMutation;
