import gql from 'graphql-tag';

const albumDefs = gql`
  extend type Query {
    allAlbums: [Album]!
    userAllAlbum(data: UserAllAlbumInput!): [Album]!
    albumInfo(data: AlbumInfoInput!): Album!
  }

  input UserAllAlbumInput {
    userId: ID!
  }

  input AlbumInfoInput {
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
