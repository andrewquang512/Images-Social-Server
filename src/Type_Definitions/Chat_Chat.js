import gql from 'graphql-tag';

const chatDefs = gql`
  extend type Query {
    allChats: [Chat]!
    chatInfo(data: ChatInfoInput!): Chat!
    getChatMessage(chatId: String, after: String): MessageConnection!
  }

  input ChatInfoInput {
    chatId: ID!
  }

  type MessageConnection {
    edges: [MessageEdge!]!
    pageInfo: PageInfo!
  }

  type MessageEdge {
    node: Message
    cursor: String!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createChat(data: CreateChatInput!): Chat!
    deleteChat(data: DeleteChatInput!): Chat!
    deleteAllChat: DeleteAllReturnType!
    # updateReport(data: UpdateReportInput!): Report!
  }

  input CreateChatInput {
    currentUserId: ID!
    firstMessage: String!
    isImage: Boolean!

    userIDs: [ID]!
  }

  input DeleteChatInput {
    chatId: ID!
  }

  type Chat {
    id: ID!

    createdAt: String!

    userIDs: [User]!
    messages: [Message]!
  }
`;

export default chatDefs;
