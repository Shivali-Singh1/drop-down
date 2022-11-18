import { gql } from '@apollo/client';

const GET_SUBMODEL_QUERY = gql`
query GetSubModelQuery($year: String!, $make: String!, $model: String!) {
    store {
      submodel(year: $year, make: $make, model: $model) {
        key
        value
      }
    }
  }
`;

export default GET_SUBMODEL_QUERY;