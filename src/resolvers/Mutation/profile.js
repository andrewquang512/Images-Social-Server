import { prisma } from '../../prisma/database.js';

// ? This profile Mutation is a part of User schema, just for splitation
const profileMutation = {
  /**
   * @param {*} parent
   * @param {{data: {userId: string, content: string}}} args
   * @param {*} info
   * @returns
   */
  addBiography: async (parent, args, info) => {
    const { userId, content } = args.data;
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        biography: content,
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{data: {skillIds: string[], userId: string}}} args
   * @param {*} info
   * @returns
   */
  setSkills: async (parent, args, info) => {
    const { skillIds, userId } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        endorsements: true,
      },
    });
    if (!user) {
      throw Error('User is not existed');
    }

    const existedSkills = await prisma.skill.findMany({
      where: {
        id: {
          in: skillIds,
        },
      },
    });

    if (existedSkills.length !== skillIds.length) {
      throw Error('Some of skill not existed');
    }

    const userSkillIds = user.endorsements.map((each) => each.skillId);

    const intersectionSKillIds = userSkillIds.filter((value) =>
      skillIds.includes(value),
    );

    const removeSkillIds = userSkillIds.filter(
      (each) => !intersectionSKillIds.includes(each),
    );

    const addSkillIds = skillIds.filter((each) => {
      if (intersectionSKillIds.length === 1 && !userSkillIds.includes(each))
        return true;
      return !intersectionSKillIds.includes(each);
    });

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        endorsements: {
          deleteMany: removeSkillIds.map((id) => {
            return {
              skillId: id,
            };
          }),
          create: addSkillIds.map((id) => {
            return {
              skill: {
                connect: {
                  id: id,
                },
              },
            };
          }),
        },
      },
    });
  },

  /**.map
   *
   * @param {*} parent
   * @param {{data: {endorsementId: string, endorserUserId: string}}} args
   * @param {*} info
   * @returns
   */
  endorseSkill: async (parent, args, info) => {
    const { endorsementId, endorserUserId } = args.data;
    const [targetUser, endorser] = await Promise.all([
      prisma.user.findFirst({
        where: {
          endorsements: {
            some: {
              id: endorsementId,
            },
          },
        },
        include: {
          endorsements: {
            include: {
              skill: true,
            },
          },
        },
      }),
      prisma.user.findUnique({
        where: {
          id: endorserUserId,
        },
      }),
    ]);

    if (!targetUser) {
      throw Error('User not have this skill');
    }

    if (!endorser) {
      throw Error('Endorsing User is not existed');
    }

    if (endorser.id === targetUser.id) {
      throw Error('endorser and targetUser can not be the same');
    }

    const endorsement = targetUser.endorsements.find(
      (each) => each.id === endorsementId,
    );

    const endorserIds = endorsement.endorserIds;

    if (endorserIds.includes(endorserUserId)) {
      throw Error('User has endorsed this skill of user');
    }

    return await prisma.endorsement.update({
      where: {
        id: endorsementId,
      },
      data: {
        endorser: {
          connect: {
            id: endorserUserId,
          },
        },
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{data: {endorsementId: string, endorserUserId: string}}} args
   * @param {*} info
   * @returns
   */
  // Todo done this
  unEndorseSkill: async (parent, args, info) => {
    const { endorsementId, endorserUserId } = args.data;
    const [targetUser, endorser] = await Promise.all([
      prisma.user.findFirst({
        where: {
          endorsements: {
            some: {
              id: endorsementId,
            },
          },
        },
        include: {
          endorsements: {
            include: {
              skill: true,
            },
          },
        },
      }),
      prisma.user.findUnique({
        where: {
          id: endorserUserId,
        },
      }),
    ]);

    if (!targetUser) {
      throw Error('User not have this skill');
    }

    if (!endorser) {
      throw Error('Endorsing User is not existed');
    }

    if (endorser.id === targetUser.id) {
      throw Error('endorser and targetUser can not be the same');
    }

    const endorsement = targetUser.endorsements.find(
      (each) => each.id === endorsementId,
    );

    const endorserIds = endorsement.endorserIds;

    if (!endorserIds.includes(endorserUserId)) {
      throw Error('User have not endorsed this skill of user');
    }

    return await prisma.endorsement.update({
      where: {
        id: endorsementId,
      },
      data: {
        endorser: {
          disconnect: {
            id: endorserUserId,
          },
        },
      },
    });
  },
};

export default profileMutation;
