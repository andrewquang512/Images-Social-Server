import { prisma } from '../../prisma/database.js';

const commentQuery = {
  // postComments: async (parent, args, info) => {
  //   return await prisma.level.findUnique({
  //     where: {
  //       userID: args.userID,
  //     },
  //   });
  // },
  // userComments: async (parent, args, info) => {
  //   return await prisma.post.findMany();
  // },
};

export default commentQuery;
