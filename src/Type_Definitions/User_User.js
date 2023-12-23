import gql from 'graphql-tag';
import commonDefs from './Common_Common.js';
import skillDefs from './Skill_Skill.js';
import categoryDefs from './Category_Category.js';

const userDefs = gql`
  extend type Query {
    allUsers: [User]!
    userInfo(data: UserInfoInput!): User!
    userFollow(data: UserInfoInput!): UserFollow!
    verifyUser(data: VerifyUserInput!): User!
    suggestUserToFollow(
      data: SuggestUserToFollowInput!
      limit: Int
      after: String
    ): UserPagination!

    getAllUserLeaderboard: [User]!

    getUserFollowingLeaderBoard(data: UserFollowingLeaderInput!): [User]!
  }

  type UserFollow {
    follower: Follower!
    following: Following!
  }

  type UserPagination {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }
  ${commonDefs}

  type UserEdge {
    node: User
    cursor: String!
  }

  input VerifyUserInput {
    hashPassword: String!
    email: String!
  }

  input SuggestUserToFollowInput {
    userId: ID!
  }

  input UserInfoInput {
    userId: ID!
  }

  input UserInfoInput {
    userId: ID!
  }

  input UserFollowingLeaderInput {
    userId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(data: DeleteUserInput!): User!
    deleteAllUser: DeleteAllReturnType!
    updateUser(data: UpdateUserInput!): User!
    addBiography(data: AddBiographyInput!): User!
    setSkills(data: SetSkillInput!): User!
    endorseSkill(data: EndorseSkillInput!): User!
    unEndorseSkill(data: EndorseSkillInput!): User!
    addInterestCategories(data: InterestCategoriesInput!): User!
    removeInterestCategories(data: InterestCategoriesInput!): User!
  }

  input EndorseSkillInput {
    endorsementId: ID!
    endorserUserId: ID!
  }

  input ProfileInfoInput {
    userId: ID!
  }

  input AddBiographyInput {
    userId: ID!
    content: String!
  }

  input InterestCategoriesInput {
    userId: ID!
    categoryIds: [String]!
  }

  input SetSkillInput {
    userId: ID!
    skillIds: [String]!
  }

  input CreateUserInput {
    name: String!
    profileImageURL: String
    backgroundImageURL: String
    email: String!
    hashPassword: String!
    phoneNumber: String
    age: Int
    birthday: String
  }

  input DeleteUserInput {
    userId: ID!
  }

  input UpdateUserInput {
    userId: ID!
    name: String
    profileImageURL: String
    backgroundImageURL: String
    email: String
    hashPassword: String
    phoneNumber: String
    age: Int
    birthday: String
  }

  type User {
    id: ID!
    isAdmin: Int!
    email: String!
    hashPassword: String!
    name: String!
    age: Int!
    birthday: String!
    phoneNumber: String!
    profileImageURL: String!
    backgroundImageURL: String!
    createdAt: String!
    updatedAt: String

    level: Level!
    posts: [Post]!
    notiIds: [Notification]!
    stories: [Story]!
    albums: [Album]!

    chatIDs: [Chat]!
    messages: [Message]!

    biography: String
    userEndorsements: [Endorsement]
    interestCategories: [Category]

    joinedContestIds: [Contest]!
    contestPrizeList: [Contest_Prize]!
  }
  ${categoryDefs}

  type Endorsement {
    id: ID!
    owner: User
    endorsers: [User]
    skill: Skill
  }
  ${skillDefs}
`;

export default userDefs;
