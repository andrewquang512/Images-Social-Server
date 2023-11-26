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
  addSkill: async (parent, args, info) => {
    const { skillIds, userId } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_to_endorsement: true,
      },
    });
    if (!user) {
      throw Error('User is not existed');
    }
    const userSkillIds = user.user_to_endorsement.map((each) => each.skillId);

    skillIds.forEach((id) => {
      if (userSkillIds.includes(id)) {
        throw Error('User has already added this skill');
      }
    });

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        user_to_endorsement: {
          // create: {
          //   skill: {
          //     connect: {
          //       id: skillId,
          //     },
          //   },
          // },
          create: skillIds.map((id) => {
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
          user_to_endorsement: {
            some: {
              id: endorsementId,
            },
          },
        },
        include: {
          user_to_endorsement: {
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

    const endorsement = targetUser.user_to_endorsement.find(
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
        endorsers: {
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
    throw Error('Not implement yet');
  },
};

export default profileMutation;
