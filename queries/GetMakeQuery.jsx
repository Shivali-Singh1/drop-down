import { gql } from '@apollo/client';

const GET_MAKE_QUERY = gql`
query GetMakeQuery($year: String!) {
    store {
      makes(year: $year) {
        key
        value
      }
    }
  }
`;

export default GET_MAKE_QUERY;