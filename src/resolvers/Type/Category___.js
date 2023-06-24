const Category = {
  posts: async (parent, args, { prisma }, info) => {
    return await prisma.post.findMany({
      where: {
        categoryId: parent.id,
      },
    });
  },
};

export default Category;
