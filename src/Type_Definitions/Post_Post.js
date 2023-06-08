import gql from 'graphql-tag';

const postDefs = gql`
  extend type Query {
    allPosts: Post
    # posts(query: String): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(data: DeletePostInput!): Post!
    deleteAllPost()
    updatePost(data: UpdatePostInput!): Post!
  }

  input CreatePostInput {
    title: String!
    userId: ID!
    imageURL: String!
    imageHash: String!
  }

  input DeletePostInput {
    postId: ID!
  }

  input UpdatePostInput {
    postId: ID!
    title: String
    body: String
    published: Boolean
  }

  type Post {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    points: Int!
    # comments: [Comment!]!

    userId: User!
    image: Image!
  }
`;

export default postDefs;
