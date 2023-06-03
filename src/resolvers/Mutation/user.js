const userMutation = {
  createUser: async (parent, args, { prisma }, info) => {
    const user = await prisma.user.create({
      data: {
        ...args.data,
        profileImageURL:
          'https://bku-profile-pic.s3.ap-southeast-1.amazonaws.com/images.jpg',
        birthday: '2000-01-01',
        phoneNumber: '',
        age: new Date().getFullYear() - 2000,
      },
    });

    const userLevel = await prisma.level.create({
      data: {
        userID: user.id,
        currentXP: 0,
        currentLevel: 0,
      },
    });

    console.log(userLevel);

    return user;
  },
  // deleteUser(parent, args, { db }, info) {
  //   const userIndex = db.users.findIndex((user) => user.id === args.id);

  //   if (userIndex === -1) {
  //     throw new Error('User not found');
  //   }

  //   const deletedUsers = db.users.splice(userIndex, 1);

  //   db.posts = db.posts.filter((post) => {
  //     const match = post.author === args.id;

  //     if (match) {
  //       db.comments = db.comments.filter((comment) => comment.post !== post.id);
  //     }

  //     return !match;
  //   });
  //   db.comments = db.comments.filter((comment) => comment.author !== args.id);

  //   return deletedUsers[0];
  // },

  // updateUser(parent, args, { db }, info) {
  //   const { id, data } = args;
  //   const user = db.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   if (typeof data.email === 'string') {
  //     const emailTaken = db.users.some((user) => user.email === data.email);

  //     if (emailTaken) {
  //       throw new Error('Email taken');
  //     }

  //     user.email = data.email;
  //   }

  //   if (typeof data.name === 'string') {
  //     user.name = data.name;
  //   }

  //   if (typeof data.age !== 'undefined') {
  //     user.age = data.age;
  //   }

  //   return user;
  // },
};

export default userMutation;
