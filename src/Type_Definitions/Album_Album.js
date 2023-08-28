import gql from 'graphql-tag';

const albumDefs = gql`
  extend type Query {
    allAlbums: [Album]!
    userAllAlbumInfo(data: UserAllAlbumInfoInput!): Album!
    albumInfo(data: AlbumInfoInput!): Album!
  }

  input UserAllAlbumInfoInput {
    userId: ID!
  }

  input AlbumInfoInput {
    albumId: ID!
  }

  extend type Mutation {
    createAlbum(data: CreateAlbumInput!): Album!
  }

  input CreateAlbumInput {
    name: String!
    userId: ID!
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

  type Album {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!

    userId: User!

    posts: [Post]!
  }
`;

export default albumDefs;
