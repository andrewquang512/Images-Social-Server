import gql from 'graphql-tag';

const categoryDefs = gql`
  extend type Query {
    allCategories: Category
    userAllCategory(data: UserAllCategoryInput!): Category!
    categoryInfo(data: CategoryInfoInput!): Category!
  }

  input UserAllCategoryInput {
    userId: ID!
  }

  input CategoryInfoInput {
    categoryId: ID!
  }

  extend type Mutation {
    createCategory(data: CreateCategoryInput!): Post!
    # deletePost(data: DeletePostInput!): Post!
    # deleteAllPost: DeleteAllReturnType!
    # updatePost(data: UpdatePostInput!): Post!
  }

  input CreateCategoryInput {
    userId: ID!
    name: String!
  }

  #   input DeletePostInput {
  #     postId: ID!
  #   }

  #   input UpdatePostInput {
  #     postId: ID!
  #     title: String
  #     body: String
  #     published: Boolean
  #   }

  type Category {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!

    postIDs: [Post]!
    userId: User!
  }
`;

export default categoryDefs;
