import { prisma } from '../../prisma/database.js';

const tagMutation = {
  createTag: async (parent, args, info) => {
    let newTag = [
      ...new Set(
        args.data.name.map((element) => {
          return element.toLowerCase();
        }),
      ),
    ];

    await Promise.all(
      newTag.map(async (tagName) => {
        const a = await prisma.tag.count({
          where: {
            name: tagName,
          },
        });

        if (!a) {
          try {
            const tag = await prisma.tag.create({
              data: {
                name: tagName,
              },
            });

            // console.log({ tag });
          } catch (e) {
            console.log(e);
            throw e;
          }
        }
      }),
    );

    return [];
  },
  deleteAllTag: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.tag.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
};

export default tagMutation;
