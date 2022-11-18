import { gql } from '@apollo/client';

const GET_MODEL_QUERY = gql`
query GetModelQuery($year: String!, $make: String!) {
    store {
      model(year: $year, make: $make) {
        key
        value
      }
    }
  }
`;

export default GET_MODEL_QUERY;