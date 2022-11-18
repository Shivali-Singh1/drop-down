import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  option,
} from "@material-ui/core";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { getYears } from "../data";
import GET_MAKE_QUERY from "../queries/GetMakeQuery";
import GET_MODEL_QUERY from "../queries/GetModelQuery";
import GET_SUBMODEL_QUERY from "../queries/GetSubModelQuery";
import GET_ENGINE_QUERY from "../queries/GetEngineQuery";
import GET_CATEGORYLIST_QUERY from "../queries/GetCategoryList";
import { useEffect } from "react";

export const client = new ApolloClient({
  uri: "http://qagapi.enetdefender.com/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [submodel, setSubmodel] = useState("");
  const [engine, setEngine] = useState("")

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_MAKE_QUERY, {
    variables: { year: year, make: "" },
  });


  const {
    data: modelData,
    loading: modelLoading,
    error: modelError,
  } = useQuery(GET_MODEL_QUERY, {
    variables: {
      year: year,
      make: make,
    },
  });


  const {
    data: submodelData,
    loading: submodelLoading,
    error: submodelError,
  } = useQuery(GET_SUBMODEL_QUERY, {
    variables: {
      year: year,
      make: make,
      model: model,
    },


  });

  const {
    data: engineData,
    loading: engineLoading,
    error: engineError,
  } = useQuery(GET_ENGINE_QUERY, {
    variables: {
      year: year,
      make: make,
      model: model,
      submodel: submodel

    },


  });

  // console.log("category", engineData, categoryData, year, make, model, submodel, engine);
  // useEffect(() => {
  //   console.log(categoryData)
  // }, [categoryData, engine])

  // if (loading) return "Loading...";
  // console.log(loading)
  // if (error) return `Error! ${error}`;



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit is clicked.");
    var validateYear = document.getElementById("year");
    var validateMake = document.getElementById("make");
    var validateModel = document.getElementById("model");
    var validateSubmodel = document.getElementById("sub-model");
    var validateEngine = document.getElementById("engine");
    {
      if (
        validateYear.value == "" ||
        validateMake.value == "" ||
        validateModel.value == "" ||
        validateSubmodel.value == ""
      ) {
        alert("Please select all the options!");
      } else
        router.push({
          pathname: "/selectedcar",
          query: { year, make, model, submodel, engine },
        });
    }
  };

  console.log("test", data?.store.makes);
  return (
    <form>
      Select the Car Model:
      <br />
      <br />
      <br />
      <label htmlFor="cars"> Year : </label>
      <NativeSelect
        name="year"
        id="year"
        onChange={(e) => {
          {
            setYear(e.target.value);
          }
        }}
      >
        <option value=""></option>
        {getYears.map((option) => (
          <option key={"key"} value={option.value}>
            {option.value}
          </option>
        ))}
      </NativeSelect>
      <label htmlFor="cars"> Make : </label>
      <NativeSelect
        name="make"
        id="make"
        onChange={(e) => {
          {
            setMake(e.target.value);
            // $make: e.target.value;
          }
        }}
      >
        <option value=""></option>
        {data?.store.makes.map((option) => (
          <option key={"key1"} value={option.value}>
            {option.value}
          </option>
        ))}
      </NativeSelect>
      <label htmlFor="cars"> Model</label>
      <NativeSelect
        name="model"
        id="model"
        onChange={(e) => {
          {
            setModel(e.target.value);
          }
        }}
      >
        <option value=""></option>
        {modelData?.store.model.map((option) => (
          <option key={"key2"} value={option.value}>
            {option.value}
          </option>
        ))}
      </NativeSelect>
      <label htmlFor="cars"> Sub-Model</label>
      <NativeSelect
        name="sub-model"
        id="sub-model"
        onChange={(e) => {
          {
            setSubmodel(e.target.value);
          }
        }}
      >
        <option value=""></option>
        {submodelData?.store.submodel.map((option) => (
          <option key={"key3"} value={option.value}>
            {option.value}
          </option>
        ))}
      </NativeSelect>
      <label htmlFor="cars"> Engine</label>
      <NativeSelect
        name="engine"
        id="engine"
        onChange={(e) => {
          {
            setEngine(e.target.value);
          }
        }}
      >
        <option value=""></option>
        {engineData?.store.engine.map((option) => (
          <option key={"key3"} value={option.value}>
            {option.value}
          </option>
        ))}
      </NativeSelect>
      <button onClick={handleSubmit}>Search</button>
    </form>
  );
}

// export async function getStaticProps() {
//   const { data: makeData } = await client.query({
//     query: GET_MAKE_QUERY,
//     variables: {
//       year: "",
//       make: "",
//     },
//   });
//   const { data: modelData } = await client.query({
//     query: GET_MODEL_QUERY,
//     variables: {
//       year: "",
//       make: "",
//     },
//   });
//   const { data: submodelData } = await client.query({
//     query: GET_SUBMODEL_QUERY,
//     variables: {
//       year: "",
//       make: "",
//       model: "",
//     },
//   });

//   return {
//     props: {
//       makeDetails: makeData.store.makes,
//       modelDetails: modelData.store.model,
//       submodelDetails: submodelData.store.submodel,
//     },
//   };
// }
