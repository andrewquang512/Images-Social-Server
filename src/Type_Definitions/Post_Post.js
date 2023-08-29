import gql from 'graphql-tag';

const postDefs = gql`
  extend type Query {
    allPosts: [Post]!
    postInfo(data: PostInfoInput!): Post!
  }

  input PostInfoInput {
    postId: ID!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(data: DeletePostInput!): Post!
    deleteAllPost: DeleteAllReturnType!
    updatePost(data: UpdatePostInput!): Post!
    interactPost(data: InteractPostInput!): Post!
  }

  input CreatePostInput {
    userId: ID!

    title: String!

    imageURL: String!
    imageHash: String!

    categoryId: [String]
    albumId: [String]
    tagId: [String]

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

  input InteractPostInput {
    postId: ID!
    isLike: Int!
  }

  # !!!!!!
  input UpdatePostInput {
    postId: ID!
    title: String
    body: String
  }

  type Post {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    points: Int!

    tagId: [Tag]!
    albumId: [Album]!
    categoryId: [Category]!

    userId: User!
    comments: [Comment]!
    image: Image!
  }
`;

export default postDefs;
