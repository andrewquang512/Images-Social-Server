import { prisma } from '../../prisma/database.js';

const skillMuation = {
  /**
   * @param {*} parent
   * @param {{data: {nameList: string[]}}} args
   * @param {*} info
   * @returns
   */
  addSkillDefinedList: async (parent, args, info) => {
    const { nameList } = args.data;
    await prisma.skill.createMany({
      data: nameList.map((each) => ({
        name: each,
      })),
    });

    return 'SUCCESS';
  },
};

export default skillMuation;
