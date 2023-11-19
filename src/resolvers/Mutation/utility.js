import { prisma } from '../../prisma/database.js';
import { hashImage } from '../Common/hashImage.js';
import { compareImages } from '../Common/compareImages.js';

const utilityMutation = {
  /**
   * @param {*} parent
   * @param {{data:{postIds: string[]} }} args
   * @param {*} info
   * @returns
   */
  hashImageWithPostIds: async (parent, args, info) => {
    const { postIds = [] } = args.data || {};

    const allPosts = await prisma.post.findMany({
      where: {
        ...(postIds.length > 0 && {
          id: {
            in: postIds,
          },
        }),
        image: {
          hash: undefined,
        },
      },
      include: {
        image: true,
      },
    });

    const promise = [];
    for (const post of allPosts) {
      const image = post.image;
      if (!image.hash) {
        const hash = await hashImage(image.url);
        const updatePromise = prisma.image.update({
          where: {
            id: image.id,
          },
          data: {
            hash: hash,
          },
        });

        promise.push(updatePromise);
      }
    }

    await Promise.all(promise);

    return 'SUCCESS';
  },

  /**
   *
   * @param {*} parent
   * @param {{post1Id: string, post2Id: string}} args
   * @param {*} info
   * @returns
   */
  checkSimilarPosts: async (parent, args, info) => {
    const { post1Id, post2Id } = args;
    const allPosts = await prisma.post.findMany({
      where: {
        id: {
          in: [post1Id, post2Id],
        },
      },
      include: {
        image: true,
      },
    });

    const images = allPosts.map((each) => each.image);
    const hash1 = images[0].hash;
    const hash2 = images[1].hash;

    const result = await compareImages(hash1, hash2);
    return {
      isSimilar: result,
      post1Imageurl: images[0].url,
      post2ImageUrl: images[1].url,
    };
  },
};

export default utilityMutation;
