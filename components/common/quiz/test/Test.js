import React from "react";
import { TestContext } from "../../../context/TestContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { useRouter } from "next/router";
const Test = () => {
  const ctx = useContext(TestContext);
  const [ans, setAns] = useState("");
  const [marks, setMarks] = useState(0);
  const [evaluated, setIsEvaluated] = useState(false);
  const [show, setShow] = useState(false);
  const [isMarked, setIsMarked] = useState(null);
   const [counter,setCounter]=useState(1)
   const test=useContext(AuthContext)
  const [timer, setTimer] = useState(moment.utc(moment(ctx.testData.data.end, "HH:mm:ss").diff(moment(ctx.testData.data.start, "HH:mm:ss"))).format("mm:ss"));
  useEffect(() => {
   
      setTimeout(() => {
        if(timer !="0.00" && !evaluated
          )
        {setTimer(moment.utc(moment(ctx.testData.data.end, "HH:mm:ss").diff(moment(ctx.testData.data.start, "HH:mm:ss"))).subtract(counter,'seconds').format("mm:ss"));
        setCounter(counter+1)
      }
      else{
        setTimer("Paper submitted")
      }
      }, [1000]);
  
  }, [timer,evaluated]);
  const router=useRouter()
  const testHandler=()=>{
    //console.log('Hello')
   test.saveHandler({
    ...ctx.testData,score:marks,taken:true
   })
   router.push('/students/home')
  }
  useEffect(() => {
    if (!isMarked) {
      for (let t of ctx.test) {
        let q = t.question;
        let obj = {};
        obj[q] = {
          1: false,
          2: false,
          3: false,
          4: false,
        };
        setIsMarked(obj);
      }
    }
    console.log(isMarked);
  }, [isMarked]);
  const classHandler = (q) => {
    if (!q) return true;
    else return false;
  };
  const evalHandler = () => {
    console.log(ctx.test);
    for (let a of ans) {
      let qtf = a["question"];
      let atf = ctx.test.find((t) => t.question == qtf)["answer"];

      if (a["answer"].toLowerCase().trim() == atf.toLowerCase().trim())
        setMarks((prev) => prev + a.marks);
    }
    setIsEvaluated(true);
  };
  const updateAns = (a, m, q) => {
    let arr = [...ans];
    let flag = false;
    for (let t of arr) {
      if (t["question"] == q) {
        t["answer"] = a;
        t["marks"] = m;
        flag = true;
        break;
      }
    }
    if (!flag) {
      arr.push({ question: q, answer: a, marks: m });
    }
    setAns(arr);
  };

  useEffect(() => {
    console.log(ans);
  }, [ans]);
  if (isMarked) {
    return (
      <>
       <div className="text-orange-500 font-medium mx-10">
            Remaining Time <span className="mx-2 font-bold text-black ">{(timer)}</span>
          </div>
        <div className="my-5 mx-10 flex">
         
          <div className="w-[60%]">
            {ctx.test &&
              ctx.test.map((t, i) => {
                return (
                  <div className="flex flex-col my-5">
                    <div className="py-3 rounded-md px-5  border-orange-500 border-2 bg-orange-100 w-[50%] ">
                      {"Q" + (i + 1) + "." + " "}
                      {t.question}
                    </div>
                    {t.distractors && (
                      <div>
                        <div
                          className={
                            classHandler(t.question) == true
                              ? "py-1 rounded-md px-5  border-green-500 border-2 bg-green-200 my-2 w-[40%] cursor-pointer"
                              : "py-1 rounded-md px-5  border-orange-500 border-2 bg-orange-100 my-2 w-[40%] cursor-pointer"
                          }
                          onClick={() => {
                            updateAns(t.answer, t.marks, t.question);
                            setIsMarked((prev) => {
                              let q = t.question;

                              let obj = {};
                              obj[q] = {
                                1: true,
                                2: false,
                                3: false,
                                4: false,
                              };

                              return obj;
                            });
                          }}
                        >
                          {1}. {t.answer}
                        </div>
                        {t.distractors.map((d, i) => (
                          <div
                            className={
                              isMarked?.t?.question[i + 2]
                                ? "py-1 rounded-md px-5  border-green-500 border-2 bg-green-200 my-2 w-[40%] cursor-pointer"
                                : "py-1 rounded-md px-5  border-orange-500 border-2 bg-orange-100 my-2 w-[40%] cursor-pointer"
                            }
                            onClick={() => {
                              updateAns(d, t.marks, t.question);

                              setIsMarked((prev) => {
                                let key = i + 2;
                                let q = t.question;

                                let obj = {};
                                if (key == 2)
                                  obj[q] = {
                                    1: false,
                                    2: true,
                                    3: false,
                                    4: false,
                                  };
                                if (key == 3)
                                  obj[q] = {
                                    1: false,
                                    2: false,
                                    3: true,
                                    4: false,
                                  };
                                if (key == 4)
                                  obj[q] = {
                                    1: false,
                                    2: false,
                                    3: false,
                                    4: true,
                                  };

                                return obj;
                              });
                            }}
                          >
                            {i + 2}. {d}
                          </div>
                        ))}
                      </div>
                    )}
                    {!t.distractors && (
                      <>
                        <label className="my-1 font-medium">Your Answer:</label>
                        <input
                          type="text"
                          className="focus:outline-none border-b-2 border-orange-400 py-1 px-1 w-[20%]"
                          onChange={(e) => {
                            updateAns(e.target.value, t.marks, t.question);
                          }}
                        ></input>
                      </>
                    )}
                  </div>
                );
              })}
            <button
              className="bg-red-700 text-white py-2 px-5 rounded-md"
              onClick={evalHandler}
              disabled={evaluated}
            >
              Submit Test
            </button>
            {evaluated && (
              <button
                className="bg-green-400 text-white py-2 px-5 rounded-md mx-5"
                onClick={() => setShow(true)}
              >
                Show Answers
              </button>
            )}
            {evaluated && (
              <>
                <div className="font-bold text-xl my-5">
                  {" "}
                  Your final score is {Math.round(marks)}/
                  {ctx.test[0].marks * ctx.test.length}
                </div>
                <div className="font-bold text-xl my-2">
                  Percentage :
                  {Math.round(
                    (marks / (ctx.test[0].marks * ctx.test.length)) * 100
                  )}{" "}
                  %
                </div>
              </>
            )}
          </div>
          <div className="w-[50%]">
            {show && <h1 className="text-lg font-bold ">Answer Key</h1>}
            {show &&
              ctx.test.map((t) => {
                return (
                  <>
                    <div className="my-5 bg-orange-100 border border-orange-500 py-4 px-5 flex flex-col justify-center w-[90%] rounded-md ">
                      <div className="my-1">Question : {t.question}</div>
                      <div>
                        Answer :
                        <span className="font-medium mx-2">{t.answer}</span>
                      </div>
                    </div>
                  </>
                );
              })}
            {show && (
              <button className="bg-orange-500 text-white py-2 px-5  rounded-sm" onClick={testHandler}>
                Save Test
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
};
export default Test;
