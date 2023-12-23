import gql from 'graphql-tag';

const messageDefs = gql`
  extend type Query {
    allMessages: [Message]!
    messageInfo(data: MessageInfoInput!): Message!
  }

  input MessageInfoInput {
    messageId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createMessage(data: CreateMessageInput!): Message!
    deleteMessage(data: DeleteMessageInput!): Message!
    deleteAllMessage: DeleteAllReturnType!
  }

  input CreateMessageInput {
    message: String!
    isImage: Boolean!

    chatId: ID!
    userId: ID!
  }

  input DeleteMessageInput {
    reportId: ID!
  }

  type Message {
    id: ID!
    createdAt: String!
    message: String!
    isImage: Boolean!

    userId: User!
    chatId: Chat!
  }
`;

export default messageDefs;
