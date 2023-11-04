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

    const totalCounts = await prisma.image.count();
    const randomSkip = Math.floor(Math.random() * totalCounts);

    const [referencePost, initImages] = await prisma.$transaction([
      prisma.post.findFirst({
        skip: randomSkip,
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
      prisma.image.findMany({
        take: limit,
        ...(after && {
          skip: 1
        }),
        ...(after && {
          cursor: {
            id: after,
          },
        }),
      }),
    ]);

    const referenceImage = referencePost.image;

    const result = [];
    for (const img of initImages) {
      try {
        const isSimilar = await compareImages(referenceImage.url, img.url)
        if (isSimilar) {
          result.push(img);
        }
      } catch (error) {
        console.error(error)
        continue
      }
    };

    let lastId = initImages[initImages.length - 1].id
    let nextItem = await prisma.image.count({
      take: 1,
      skip: 1,
      cursor: {
        id: lastId,
      },
    })
    while (result.length !== limit && nextItem) {

      const nextImages = await prisma.image.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: lastId,
        },
      })

      for (const img of nextImages) {
        try {
          const isSimilar = await compareImages(referenceImage.url, img.url)
          if (isSimilar) {
            result.push(img);
          }
        } catch (error) {
          console.error(error)
          continue
        }
      };

      lastId = nextImages[nextImages.length - 1].id
      nextItem = await prisma.image.count({
        take: 1,
        skip: 1,
        cursor: {
          id: lastId,
        },
      })
    }

    console.log('Result', result);

    const hasNextPage = result.length !== 0 && nextItem;
    console.log('hasNextPage', hasNextPage);

    const nodes = result.map((each) => ({
      node: each,
      cursor: each.id,
    }));
    return {
      edges: nodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: after ? true : false,
        // startCursor,
        startCursor: nodes.length === 0 ? '' : nodes[0].cursor,
        endCursor: nodes.length === 0 ? '' : nodes.slice(-1)[0].cursor,
      },
    };

    return result;
  },
};

export default imageQuery;
