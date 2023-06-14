import gql from 'graphql-tag';

const postDefs = gql`
  extend type Query {
    allPosts: Post
    # posts(query: String): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(data: DeletePostInput!): Post!
    deleteAllPost: DeleteAllReturnType!
    updatePost(data: UpdatePostInput!): Post!
  }

  input CreatePostInput {
    userId: ID!

    title: String!

    imageURL: String!
    imageHash: String!

    camera: String
    lens: String
    aperture: String
    focalLength: String
    shutterSpeed: String
    ISO: String
    takenWhen: String
    copyRight: String
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
