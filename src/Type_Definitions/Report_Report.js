import gql from 'graphql-tag';

const reportDefs = gql`
  extend type Query {
    allReports: [Report]!
    reportInfo(data: ReportInfoInput!): Report!
  }

  input ReportInfoInput {
    reportId: ID!
  }

  # _______________________________________________________
  # _______________________________________________________

  extend type Mutation {
    createReport(data: CreateReportInput!): Report!
    deleteReport(data: DeleteReportInput!): Report!
    deleteAllReport: DeleteAllReturnType!
    # updateReport(data: UpdateReportInput!): Report!
  }

  input CreateReportInput {
    reason: String!
    postId: ID!
    userId: ID!

    userReported: ID!
  }

  input DeleteReportInput {
    reportId: ID!
  }

  input UpdateReportInput {
    reportId: ID!
    isFinished: Boolean!
  }

  type Report {
    id: ID!

    isFinished: Boolean!
    reason: String!
    postId: ID!
    userId: ID!

    userReported: ID!
  }
`;

export default reportDefs;
