import gql from 'graphql-tag';

const comomonDefs = gql`
    type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;

export default comomonDefs;
