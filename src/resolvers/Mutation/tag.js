import * as Prisma from '@prisma/client';

const tagMutation = {
  createTag: async (parent, args, { prisma }, info) => {
    let tag,
      result = [],
      newTag = args.data.name.map((element) => {
        return element.toLowerCase();
      });
    newTag = [...new Set(newTag)];

    await newTag.map(async (tagName) => {
      const a = await prisma.tag.count({
        where: {
          name: tagName,
        },
      });

      if (!a) {
        try {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
            },
          });

          console.log({ tag });
          result.push(tag);
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e);
          }
          throw e;
        }
      }
    });
    // console.log({ result });

    return result;
  },
  deleteAllTag: async (parent, args, { prisma }, info) => {
    let result;
    try {
      result = await prisma.tag.deleteMany({});
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      throw e;
    }

    return result;
  },
};

export default tagMutation;
