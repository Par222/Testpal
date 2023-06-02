import NavBar from "../../../components/common/NavBar";
import Test from "../../../components/common/quiz/test/Test";
import { useRouter } from "next/router";
import { TestContext } from "../../../components/context/TestContext";
import { useContext } from "react";
const Preview = () => {
   const ctx=useContext(TestContext)

  return (
    <>
      <NavBar></NavBar>
      <div className="mt-10 mx-10 font-bold text-lg">
     
        
      </div >
      <div className="my-1 mx-10  text-base">Answer each of the following questions in single word</div>
      <Test></Test>
    </>
  );
};
export default Preview;
