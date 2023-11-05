import _ from 'lodash';
import { prisma } from '../../prisma/database.js';

const contestQuery = {
  allContests: async (parent, args, info) => {
    return await prisma.contest.findMany();
  },
  contestInfo: async (parent, args, info) => {
    return await prisma.contest.findUnique({
      where: {
        id: args.contest.reportId,
      },
    });
  },
};

export default contestQuery;
