import { gql } from '@apollo/client';

const GET_ENGINE_QUERY = gql`
query GetEngineQuery($year: String!, $make: String!, $model: String!, $submodel: String!) {
    store {
      engine(year: $year, make: $make, model: $model, submodel: $submodel) {
        key
        value
      }
    }
  }
`;

export default GET_ENGINE_QUERY;