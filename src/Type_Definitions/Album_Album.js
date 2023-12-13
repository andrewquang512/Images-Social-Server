import gql from 'graphql-tag';

const albumDefs = gql`
  extend type Query {
    allAlbums: [Album]!
    userAllAlbum(data: UserAllAlbumInput!): [Album]!
    albumInfo(data: AlbumInfoInput!): [Post]!
  }

  input UserAllAlbumInput {
    userId: ID!
  }

  input AlbumInfoInput {
    currentUserId: ID!
    userId: ID!
    albumId: ID!
  }

  extend type Mutation {
    createAlbum(data: CreateAlbumInput!): Album!

    deleteAlbum(data: DeleteAlbumInput!): Album!
    deleteAllAlbum: DeleteAllReturnType!

    updateAlbum(data: UpdateAlbumInput!): Album!
  }

  input CreateAlbumInput {
    userId: ID!
    name: String!
  }

  input DeleteAlbumInput {
    albumId: ID!
  }

  input UpdateAlbumInput {
    albumId: ID!
    name: String!
  }

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
