import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const skillQuery = {
  getSkillDefinedList: async (parent, args, info) => {
    const result = await prisma.skill.findMany();

    if (result.length === 0) return [];
    return result;
  },
};

export default skillQuery;
