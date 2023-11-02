import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';
import { compareImages } from '../Common/compareImages.js';

const imageQuery = {
  allImages: async (parent, args, info) => {
    return await prisma.image.findMany();
  },

  /**
   * @param {*} parent
   * @param {{data: {categoryId: string, limit: number, after: string}}} args
   * @param {*} info
   */
  exploreImages: async (parent, args, info) => {
    const { after, categoryId, limit = DEFAULT_LIMIT } = args.data;

    const result = [];
    const [referencePosts, allImages] = await Promise.all([
      prisma.post.findMany({
        take: limit / 2,
        where: {
          categoryId: {
            has: categoryId,
          },
          image: {
            isNot: null,
          },
        },
        include: {
          image: {
            include: true,
          },
        },
      }),
      prisma.image.findMany(),
    ]);

    const referenceImages = referencePosts.map((each) => each.image);

    allImages.map(async (img) => {
      for (const refImage of referenceImages) {
        if (compareImages(refImage.url, img.url)) {
          result.push(img);
        }
      }
    });

    return result;
  },
};

export default imageQuery;
