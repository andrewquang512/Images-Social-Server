import { prisma } from '../../prisma/database.js';

const postMutation = {
  createPost: async (parent, args, info) => {
    let post;
    try {
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

          image: {
            create: {
              url: args.data.imageURL,
              hash: args.data.imageHash,

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
          postViewStatus: args.data.hasOwnProperty('postViewStatus')
            ? args.data.postViewStatus
            : undefined,
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
      try {
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
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);
        }
        throw e;
      }
    } else {
      try {
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
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);
        }
        throw e;
      }
    }

    return post;
  },
};

export default postMutation;
