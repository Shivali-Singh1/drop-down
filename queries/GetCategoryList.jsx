import { gql } from '@apollo/client';

const GET_CATEGORYLIST_QUERY = gql`
query Query($year: String!, $make: String!, $model: String!, $submodel: String!, $engine: String!) {
    store {
      categoryfilter(year: $year, make: $make, model: $model, submodel: $submodel, engine: $engine) {
        submodelID
        categorylist {
          category
          subcategoryList {
            key
            value
          }
        }
      }
    }
  }
`;

export default GET_CATEGORYLIST_QUERY;