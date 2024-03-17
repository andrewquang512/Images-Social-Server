import gql from 'graphql-tag';

const notiDefs = gql`
  extend type Query {
    allNotis: [Notification]!
    userNotis(data: UserNotiInfoInput!): [Notification]!
  }

  input UserNotiInfoInput {
    userId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    deleteNoti(data: DeleteNotiInput!): Notification!
    deleteNotiUser(data: DeleteNotiUserInput!): Notification!
    deleteAllNoti: DeleteAllReturnType!
  }

  input DeleteNotiInput {
    notiId: ID!
  }

  input DeleteNotiUserInput {
    userId: ID!
  }

  type Notification {
    id: ID!

    type: String!
    postId: String!
    postTitle: String!
    postImage: String!

    userTriggerId: User!
    userIds: [User]!

    createdAt: String!
  }
`;

export default notiDefs;
