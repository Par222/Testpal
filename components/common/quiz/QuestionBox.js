import { useState } from "react";
import { TestContext } from "../../context/TestContext";
import { useContext } from "react";
const QuestionBox = (props) => {
    const [isAdd,setIsAdd]=useState(false)
    const [test,setTest]=useState([])
    const [isDisabled,setIsDisabled]=useState(false)
    const ctx=useContext(TestContext)
    console.log(props)

    const addHandler=()=>{

       ctx.addQuestion({
        'question':props.question,
        'answer':props.answer,
         'type':props.type,
         'marks':props.mpq,
         'distractors':props.distractors?props.distractors:'',
        
       })
    
       
       props.updateMarks(ctx.test.length,'add')
       setIsAdd(true)
    }
    const removeHandler=()=>{

       ctx.removeQuestion(props.answer)
       
       props.updateMarks(ctx.test.length,'remove')
       setIsAdd(false)
    }
 return(
<div className="my-5 bg-orange-100 border border-orange-500 py-4 px-5 flex flex-col justify-center w-[90%] rounded-md ">
        <div className="my-1">{props.question.replace(props.question[0],props.question[0].toUpperCase())}</div>
        <div>Answer :<span className="font-medium mx-2">{props.answer}</span></div>
        {props.type=='MCQ' && props.distractors && props?.distractors.map((option,i)=><div>{i+2}. {option}</div>)}
    <div className="flex space-x-5">
    <button className={isAdd?"w-[30%] my-2 py-1 px-5 text-white bg-gray-300 rounded-sm font-medium":"w-[30%] my-2 py-1 px-5 text-white bg-green-400 rounded-sm font-medium"} onClick={addHandler} disabled={isAdd}>Add to Test</button>
    <button className={!isAdd?"w-[30%] my-2 py-1 px-5 text-white bg-gray-300 rounded-sm font-medium":"w-[30%] my-2 py-1 px-5 text-white bg-red-500 rounded-sm font-medium"} disabled={!isAdd} onClick={removeHandler}>Remove From Test</button>
    </div>
    </div>
 )
};
export default QuestionBox
