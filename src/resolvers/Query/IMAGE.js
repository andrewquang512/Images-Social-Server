import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';
import { compareImages } from '../Common/compareImages.js';

const imageQuery = {
  allImages: async (parent, args, info) => {
    return await prisma.image.findMany();
  },

  /**
   * @param {*} parent
   * @param {{data: {categoryId: string}, limit: number, after: string}} args
   * @param {*} info
   */
  exploreImages: async (parent, args, info) => {
    const { after, limit = DEFAULT_LIMIT } = args;

    const [referencePost, initImages] = await prisma.$transaction([
      prisma.post.findFirst({
        where: {
          ...(args.data?.categoryId && {
            categoryId: {
              has: args.data?.categoryId || undefined,
            },
          }),
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
          skip: 1,
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
    console.log('Init Stage');
    const initImagesMap = [];
    for (const img of initImages) {
      initImagesMap.push(compareImages(referenceImage.url, img.url));
    }

    const isSimilarImages = await Promise.allSettled(initImagesMap);
    for (const imgIndex in initImages) {
      if (isSimilarImages[imgIndex]?.value) {
        result.push(initImages[imgIndex]);
      } else {
        // Error
        console.log(isSimilarImages[imgIndex]);
      }
    }

    let lastId = initImages[initImages.length - 1].id;
    let nextItem = await prisma.image.count({
      take: 1,
      skip: 1,
      cursor: {
        id: lastId,
      },
    });
    console.log('Loop Stage');
    while (result.length !== limit && nextItem) {
      const nextImages = await prisma.image.findMany({
        take: limit,
        skip: 1,
        cursor: {
          id: lastId,
        },
      });

      const nextImagesMap = [];
      for (const img of nextImages) {
        nextImagesMap.push(compareImages(referenceImage.url, img.url));
      }

      const isSimilarImages = await Promise.allSettled(nextImagesMap);
      for (const imgIndex in nextImages) {
        if (isSimilarImages[imgIndex]?.value) {
          result.push(nextImages[imgIndex]);
        } else {
          // Error
          console.log(isSimilarImages[imgIndex]);
        }
      }

      lastId = nextImages[nextImages.length - 1].id;
      nextItem = await prisma.image.count({
        take: 1,
        skip: 1,
        cursor: {
          id: lastId,
        },
      });
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
  },
};

export default imageQuery;
