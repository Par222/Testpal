import { useState } from "react";
import QuestionBox from "./QuestionBox";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const Fib=(props)=>{
  
    const[qA,setQa]=useState(null)
    const [modal,setModal]=useState(false)
    const router=useRouter()
    const previewHandler=()=>{
      
       props.modalHandler(true)
    }
    const fetchQA=async()=>{
      console.log(props)
      const form=new FormData()
      form.append("index",parseInt(props.index))
      form.append("topic",props.topic)
      form.append("offset",parseInt(props.offset))
      form.append("url",props.uploadUrl)
      const result=await axios.post('http://127.0.0.1:5000/',form)
      props.setLoading(false)
      setQa(result.data)
      console.log(result.data)
    }
    const fetchfib=async()=>{
      console.log(props)
      const form=new FormData()
      console.log()
      form.append("question_context",JSON.stringify(qA))
  
      const result=await axios.post('http://127.0.0.1:5000/fib',form)
      setQa(result.data)
      
    }
    
    let qAFib = [
        {
          question:
            "_________ is process of dividing a table into set of smaller table",
          answer: "Fragmentation",
        },
        {
          question:
            "Data _______ is process of storing copy of database at 2 or more databases",
          answer: "Replication",
        },
      ];
      let qAmcq=[{
        question:
        "What is common fault tolerance technique of distributed databases?",
      answer: "Replication",
      distractors:['Inconsistency','Redundancy','Clustering']
      
      },{
        question:
            "What is task of dividing a table into set of smaller table?",
          answer: "Fragmentation",
      
      distractors:['Clustering','Data Mining','Replication']
      }
    ]
      useEffect(()=>{
      if(props.type=='FIB')
       fetchfib()
       if(props.type=='One Word')
       fetchQA()   
       if(props.type=='MCQ')
       setQa(qAmcq) 
         
      },[props.type])
    return(
        <div className="flex flex-col justify-center ">
            {qA && qA.map((q)=><QuestionBox {...q} updateMarks={props.updateMarks}  mpq={props.marks/qA.length} type={props.type} marks={props.marks}  title={props.title} date={props.date} startTime={props.startTime} endTime={props.endTime}></QuestionBox>)}
            <button onClick={previewHandler} className="bg-orange-500 text-white py-2 px-5 w-[30%]">Publish Test</button>
        </div>

    )
}
export default Fib