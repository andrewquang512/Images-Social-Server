import gql from 'graphql-tag';

// model User {
//   id              String   @id @default(auto()) @map("_id") @db.ObjectId
//   // email           String   @unique
//   email           String
//   phoneNumber     String
//   hashPassword    String
//   name            String
//   profileImageURL String
//   age             Int      @default(18)
//   birthday        String
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt

//   sessions      Session[]
//   level         Level?
//   posts         Post[]
//   comments      Comment[]
//   replyComments ReplyComment[]
//   followers     Follower?
//   followings    Following?
//   messages      Message[]
//   courses       Course[]
//   notifications Notification[]

//   reportIDs      String[] @db.ObjectId
//   user_to_report Report[] @relation(fields: [reportIDs], references: [id])

//   chatIDs      String[] @db.ObjectId
//   user_to_chat Chat[]   @relation(fields: [chatIDs], references: [id])
// }

const userDefs = gql`
  extend type Query {
    userInfo(id: String!): User!
    allUsers: [User!]!
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    # createUser(data: CreateUserInput!): User!
    # deleteUser(id: ID!): User!
    # updateUser(id: ID!, data: UpdateUserInput!): User!
  }

  input CreateUserInput {
    name: String!
    profileImageURL: String
    email: String!
    hashPassword: String!
    phoneNumber: String
    age: Int
    birthday: String
  }

  # input UpdateUserInput {
  #   name: String
  #   email: String
  #   age: Int
  # }

  # input userInfo {
  #   userID: String!
  # }

  type User {
    id: ID!
    email: String!
    hashPassword: String!
    name: String!
    age: Int
    birthday: String!
    phoneNumber: String!
    profileImageURL: String!
    createdAt: String!
    updatedAt: String

    level: Level!
  }
`;

export default userDefs;
