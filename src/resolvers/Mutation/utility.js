import { prisma } from '../../prisma/database.js';
import { hashImage } from '../Common/hashImage.js';

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
        image: {
          include: true,
        },
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
};

export default utilityMutation;
