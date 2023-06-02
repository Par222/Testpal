import React from "react";
import { useState } from "react";
export const TestContext = React.createContext({
  test: [],
  addQuestion: () => {},
  removeQuestion: () => {},
  testData:{},
  testDataHandler:()=>{}
});
const TestProvider = (props) => {
  const [test, setTest] =useState([]);
  const [testData,setTestData]=useState({})
  const addQuestion = (q) => {
    setTest([...test, q]);
  };
  const removeQuestion = (ans) => {
    setTest((prev) => prev.filter((t) => t.answer != ans));
  };
  const testDataHandler=(data)=>{
    setTestData(
      {
        results:test,data:data
      }
    )
  }
  const val = {
    test,
    addQuestion,
    removeQuestion,
    testData,
    testDataHandler
  };
  return (
    <TestContext.Provider value={val}>{props.children}</TestContext.Provider>
  );
};
export default TestProvider
