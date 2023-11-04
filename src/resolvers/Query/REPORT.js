import _ from 'lodash';
import { prisma } from '../../prisma/database.js';

const userQuery = {
  allReports: async (parent, args, info) => {
    return await prisma.report.findMany();
  },
  reportInfo: async (parent, args, info) => {
    return await prisma.report.findUnique({
      where: {
        id: args.data.reportId,
      },
    });
  },
};

export default userQuery;
