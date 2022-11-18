import { useRouter } from "next/router";
import { GetStaticProps } from "../index";
import GET_CATEGORYLIST_QUERY from "../../queries/GetCategoryList";
import { NativeSelect } from "@material-ui/core";
import { useQuery } from "@apollo/client";
// const a = [1, 2, 3, 4, 5];
const Index = ({ query }) => {
  const router = useRouter();
  // console.log("router", router);   
  // console.log(
  //   "here",
  //   a.map((item) => item)
  // );
  const { year, make, model, submodel, engine } = router.query;
  const {
    loading,
    error,
    data: categoryData,
  } = useQuery(GET_CATEGORYLIST_QUERY, {
    variables: {
      year: year,
      make: make,
      model: model,
      submodel: submodel,
      engine: engine,
    },
  });
  // console.log("category", categoryData?.store.categoryfilter.categorylist);
  return (
    <>
      <div>
        You have selected {make} ({model},{submodel}, {engine}) and it was
        launched in Year: {year}.{" "}
      </div>
      <h1>Available categories for your selection:</h1>
      
      {categoryData?.store.categoryfilter.categorylist.map((item) => (
        <li key={"key"}>{item.category}</li>
      ))}
    </>
  );
};

export default Index;
