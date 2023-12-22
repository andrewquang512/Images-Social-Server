import { prisma } from '../../prisma/database.js';
import { hashImage } from '../Common/hashImage.js';
import { sendNotificationToClient } from '../../notify.js';

const postMutation = {
  createPost: async (parent, args, info) => {
    let post;
    const imageHash = await hashImage(args.data.imageURL);
    try {
      const follower = await prisma.follower.findUnique({
        where: {
          userId: args.data.userId,
        },
      });
      console.log({ follower });

      post = await prisma.post.create({
        data: {
          title: args.data.title,
          userId: args.data.userId,
          caption: args.data.caption,
          postViewStatus: args.data.postViewStatus,
          contestId: args.data.contestId,
          points: 0,

          categoryId: args.data.categoryId ? args.data.categoryId : [],
          albumId: args.data.albumId ? args.data.albumId : [],
          tag: args.data.tag ? args.data.tag : [],
          reportedUserIds: [],

          image: {
            create: {
              url: args.data.imageURL,
              hash: imageHash,

              imageInfoId: {
                create: {
                  camera: args.data.camera,
                  lens: args.data.lens,
                  aperture: args.data.aperture,
                  focalLength: args.data.focalLength,
                  shutterSpeed: args.data.shutterSpeed,
                  ISO: args.data.ISO,
                  takenWhen: args.data.takenWhen,
                  copyRight: args.data.copyRight,
                },
              },
            },
          },
        },
      });
      console.log({ post });

      const a = await prisma.notification.create({
        data: {
          type: 'POST_CREATED',
          postId: post.id,
          postTitle: post.title,
          postImage: args.data.imageURL,
          userTriggerId: post.userId,
          userIds: follower.userFollower,
        },
      });
      console.log({ a });

      sendNotificationToClient(
        [
          'eUW71E0j4VAwZdHuyjdnQd:APA91bFKKXAsu_RxExCsDDK7V0AaqvHF9tW51bUBBDUkbvtxHEe9DpnFMhUfvgwVSAoud89y1rHxpeeEesWZZ9hkqAkkEMoP-7ys6QjYekcLln-bnXvvWfdG2ISZGwLtIm0iVH526VLr',
          'cL1Bw65HsSxGyqeJdii03m:APA91bGtBsY-8Wuj0SmG2qnmcqeluO5rqaUDerVpmHHs2Qy1dtTWWjnWXTpA2Lj-Mgx_8nRia_Fkhf96KIAYazyyDV-SHwR5PhPfJFzr9iMn4B4-z9qHdui5bYTh1fj5gt9jw-VGmBhX',
          'f4P4yK6nWsran8PhBsgeIm:APA91bFw4NZSX4NyHuXXQDP1MkKE5lm1m_1MssnCCgftX2LQdcKfsKUuRYd1T4d_XHjvncZOOfoxCxPbjrtf38FQj89n3PucD1xYXJuBI-ckBTfUMpKsACY-RfgHVLi_827zZVbIw74L',
        ],
        {
          title: 'Notify new post',
          body: JSON.stringify({ post, follower }),
        },
      );
    } catch (e) {
      console.log(e);
      throw e;
    }

    return post;
  },
  deletePost: async (parent, args, info) => {
    let post;
    try {
      post = await prisma.post.delete({
        where: {
          id: args.data.postId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return post;
  },
  deleteAllPost: async (parent, args, info) => {
    let result;
    try {
      result = await prisma.post.deleteMany({});
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  updatePost: async (parent, args, info) => {
    let result;
    console.log(args.data);
    try {
      result = await prisma.post.update({
        where: {
          id: args.data.postId,
        },
        data: {
          title: args.data.title || undefined,
          caption: args.data.caption || undefined,
          postViewStatus: args.data.postViewStatus || undefined,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }

    return result;
  },
  interactPost: async (parent, args, info) => {
    let post;

    if (args.data.isLiked) {
      post = await prisma.post.update({
        where: {
          id: args.data.postId,
        },
        data: {
          points: {
            increment: 1,
          },
          userLikedPost: {
            push: args.data.likedUserId,
          },
        },
      });
      let b = await prisma.post.findUnique({
        where: {
          id: args.data.postId,
        },
        include: { image: true },
      });
      console.log({ b });

      const a = await prisma.notification.create({
        data: {
          type: 'POST_LIKED',
          postId: post.id,
          postTitle: post.title,
          postImage: b.image.url,
          userTriggerId: args.data.likedUserId,
          userIds: [post.userId],
        },
      });
      console.log({ a });

      sendNotificationToClient(
        [
          'eUW71E0j4VAwZdHuyjdnQd:APA91bFKKXAsu_RxExCsDDK7V0AaqvHF9tW51bUBBDUkbvtxHEe9DpnFMhUfvgwVSAoud89y1rHxpeeEesWZZ9hkqAkkEMoP-7ys6QjYekcLln-bnXvvWfdG2ISZGwLtIm0iVH526VLr',
          'cL1Bw65HsSxGyqeJdii03m:APA91bGtBsY-8Wuj0SmG2qnmcqeluO5rqaUDerVpmHHs2Qy1dtTWWjnWXTpA2Lj-Mgx_8nRia_Fkhf96KIAYazyyDV-SHwR5PhPfJFzr9iMn4B4-z9qHdui5bYTh1fj5gt9jw-VGmBhX',
          'f4P4yK6nWsran8PhBsgeIm:APA91bFw4NZSX4NyHuXXQDP1MkKE5lm1m_1MssnCCgftX2LQdcKfsKUuRYd1T4d_XHjvncZOOfoxCxPbjrtf38FQj89n3PucD1xYXJuBI-ckBTfUMpKsACY-RfgHVLi_827zZVbIw74L',
        ],
        {
          title: 'Notify user like post',
          body: JSON.stringify({ post, likedUserId: args.data.likedUserId }),
        },
      );
    } else {
      const { userLikedPost } = await prisma.post.findUnique({
        where: {
          id: args.data.postId,
        },
      });
      console.log(userLikedPost);

      post = await prisma.post.update({
        where: {
          id: args.data.postId,
        },
        data: {
          points: {
            increment: -1,
          },
          userLikedPost: {
            set: userLikedPost.filter((id) => id !== args.data.likedUserId),
          },
        },
      });

      if (post.points == -1) {
        post = await prisma.post.update({
          where: {
            id: args.data.postId,
          },
          data: {
            points: 0,
          },
        });
      }
    }

    return post;
  },
  reportedPost: async (parent, args, info) => {
    let post;
    console.log({ args });

    post = await prisma.post.update({
      where: {
        id: args.data.postId,
      },
      data: {
        reportedUserIds: { push: args.data.userId },
      },
    });

    return post;
  },
};

export default postMutation;
