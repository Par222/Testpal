import React from "react";
import Fib from "./Fib";

const TestMaker=(props)=>{

    console.log(props)
    return(
        <div>
            {<Fib updateMarks={props.updateMarks} marks={props.marks} type={props.type} modalHandler={props.modalHandler} setLoading={props.setLoading}
            title={props.title} date={props.date} startTime={props.startTime} endTime={props.endTime} index={props.index} topic={props.topic} offset={props.offset} uploadUrl={props.uploadUrl}></Fib>}
        </div>
    )

}
export default TestMaker