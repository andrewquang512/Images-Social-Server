import _ from 'lodash';
import { prisma } from '../../prisma/database.js';

const userQuery = {
  allReports: async (parent, args, info) => {
    return _.reverse(
      await prisma.report.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    );
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
