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
    deleteAllNoti: DeleteAllReturnType!
  }

  input DeleteNotiInput {
    notiId: ID!
  }

  type Notification {
    id: ID!

    type: String!
    postId: String!

    userTriggerId: User!
    userIds: [User]!

    createdAt: String!
  }
`;

export default notiDefs;
