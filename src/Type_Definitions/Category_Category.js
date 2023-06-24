import gql from 'graphql-tag';

const categoryDefs = gql`
  extend type Query {
    allCategories: Category
    categoryInfo(data: CategoryInfoInput!): Category!
  }

  input UserAllCategoryInput {
    userId: ID!
  }

  input CategoryInfoInput {
    categoryId: ID!
  }

  extend type Mutation {
    createCategory(data: CreateCategoryInput!): Category!
  }

  input CreateCategoryInput {
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

    posts: [Post]!
  }
`;

export default categoryDefs;
