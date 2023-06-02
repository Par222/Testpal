import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../../components/common/NavBar";
import DropFileUpload from "../../../components/common/FileUpload";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import moment from "moment";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import TestMaker from "../../../components/common/quiz/TestMaker";
import DatePickers from "../../../components/common/DatePicker";
import TimePickers from "../../../components/common/Timepicker";
import { TestContext } from "../../../components/context/TestContext";
import { storage } from "../../../firebase/firebase";
import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { setLogLevel } from "firebase/app";
const Index = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
   const ctx=useContext(TestContext)
  let q_types = ["MCQ", "One Word", "FIB", "True Or False"];
  const [marks, setMarks] = useState(5);
  const [index, setIndex] = useState(1);
  const [offset, setOffset] = useState(0);
  const [qType, setQtype] = useState("");
  const [book, setBook] = useState(null);
  const [url, setUrl] = useState("");
  const [isGen, setisGen] = useState(false);
  const [topic,setTopic]=useState('')
  const [uploadUrl,setUploadUrl]=useState('')
  const [isLoading,setisLoading]=useState(false)
  const [markTill,setMarkTill]=useState(0)
  const updateMarks=(mark,type)=>{
    if(type=='add')
    {
    setMarkTill(marks/(mark+1))
    
    console.log(markTill)
    }
    else{
        setMarkTill(mark-1==0?0:marks/(mark-1))
    }
  }
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment().format("hh:mm:ss a"));
  const [endTime, setEndTime] = useState(moment().format("hh:mm:ss a"));
  const getImageURL = async (pdf) => {
    try {
      const pdfRef = ref(storage, `books/pdf/${pdf.name}`);
      const imageUploadResponse = await uploadBytes(pdfRef, pdf);
      const imageDownloadResponse = await getDownloadURL(pdfRef);
      console.log(imageDownloadResponse)
      return imageDownloadResponse;
    } catch (error) {
      console.log(error,'Err');
    }
  };
  useEffect(()=>{
    console.log(uploadUrl)
  },[uploadUrl])
  useEffect(() => {
    if (book) {
      setUrl(URL.createObjectURL(book[book.length - 1]));
      getImageURL(book[book.length-1]).then((url)=>setUploadUrl(url))
      console.log('Hello')
    }
  }, [book]);
  const upload = (accepted, rejected) => {
    setBook([...accepted]);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    setisGen(true);
    setLoading(true)
  };
  const [modal,setModal]=useState(false)
  const modalHandler=(val)=>{
   setModal(val)
  }
  const publishHandler=(e)=>{
    e.preventDefault()
    let attributes={
      date,
      start:startTime,
      end:endTime,
      title,
      name:"Pramod Bide",
      marks:marks,
      subject:topic
    }
    console.log(attributes)
    ctx.testDataHandler(attributes)
    setModal(false)

  }
  useEffect(()=>{
    console.log(index,offset)
  },[index,offset])
  const [title,setTitle]=useState("")
  const setLoading=(param)=>{
    setisLoading(param)
  }
  return (
    <div>
      {modal && <div className="absolute z-10 bg-black opacity-80 w-full h-full" onClick={()=>setModal(false)}></div>}
      {modal && <div
      className="h-[65%] w-[50%] top-[17.5%] left-[25%] bg-white z-50 absolute rounded-md"
      >
        <h1 className="text-white bg-orange-400 py-2 px-5 font-bold text-2xl">Publish Test</h1>
        <form className="px-5 py-2 flex flex-col" onSubmit={publishHandler}>
          <label className="font-bold text-base"> Test Title</label>
          <input type="text" value={title} className="py-2 focus:outline-none border-b-2 border-orange-500 w-[60%]" onChange={(e)=>setTitle(e.target.value)}></input>
          <label htmlFor="type" className="mt-4">
            Test Date<span className="text-red-600">*</span>
          </label>
          <div className=" w-[60%]">
            <DatePickers
              dateHandler={(date) => setDate(moment(date).format("DD-MM-YYYY"))}
            ></DatePickers>
          </div>
          <label htmlFor="type" className="mt-4">
            Test Start Time<span className="text-red-600">*</span>
          </label>
          <div className="w-[60%]">
            <TimePickers
              timeHandler={(startTime) =>
                setStartTime(moment(startTime).format("hh:mm a"))
              }
            ></TimePickers>
          </div>
          <label htmlFor="type" className="mt-4">
            Test End Time<span className="text-red-600">*</span>
          </label>
          <div className="w-[60%]">
            <TimePickers
              timeHandler={(endTime) =>
                setEndTime(moment(endTime).format("hh:mm a"))
              }
            ></TimePickers>
          </div>
          <div className="flex justify-end w-full my-2 mx-3 space-x-5">
            <button className="text-white bg-orange-500 rounded-full py-1 px-5 " type="submit">Publish</button>
            <button className="text-white bg-gray-300 rounded-full py-1 px-5 " onClick={()=>setModal(false)} type="button">Cancel</button>
          </div>
        </form>
        </div>}
      <NavBar></NavBar>
      <div className="flex">
        <form
          className="my-10 w-[50%] flex flex-col mx-10"
          onSubmit={submitHandler}
        >
          <DropFileUpload
            msg="Drag or browse to"
            extension="upload a pdf file"
            uploadFiles={upload}
          ></DropFileUpload>
          {book && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "850px",
                }}
              >
                <Viewer fileUrl={url} />
              </div>
            </Worker>
          )}
          <label htmlFor="index" className="">
            Index page
          </label>
          <input
            name="index"
            type="number"
            className="focus:outline-none w-[50%] py-1 px-1 border-orange-500 border-b-2"
            defaultValue={1}
            onChange={(e) => setIndex(e.target.value)}
          ></input>
          <label className="my-2" htmlFor="offset">
            Offset
          </label>
          <input
            name="offset"
            type="number"
            className="focus:outline-none w-[50%] py-1 px-1 border-orange-500 border-b-2"
            defaultValue={0}
            onChange={(e) => setOffset(e.target.value)}
          ></input>
          <label htmlFor="marks" className="my-1">
            Test Marks
          </label>
          <input
            name="marks"
            type="number"
            className="focus:outline-none w-[50%] py-1 px-1 border-orange-500 border-b-2"
            defaultValue={5}
            onChange={(e) => setMarks(e.target.value)}
          ></input>
          <label htmlFor="topic" className="my-1">
            Topic
          </label>
          <input
            name="topic"
            type="text"
            className="focus:outline-none w-[50%] py-1 px-1 border-orange-500 border-b-2"
            onChange={(e)=>setTopic(e.target.value)}
          ></input>
          <label htmlFor="q_type" className="my-1">
            Question Format
          </label>
          <select
            name=" q_type"
            className="w-[50%] focus:outline-none border-b-2 border-orange-500 py-2"
            onChange={(e) => setQtype(e.target.value)}
          >
            {q_types.map((q) => (
              <option value={q}>{q}</option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-green-400 my-4 py-2 px-4 text-white text-lg font-medium w-[60%]"
          >
            Generate Test
          </button>
        </form>
      
      {isGen && <div className="my-10 w-[50%]">
        <h1 className="font-bold text-lg text-center">Preview Test</h1>
         <span><span className="font-bold">Marks per question</span> : {markTill}</span>
         {isLoading  && <div><img src="/Icons/loading.svg"></img></div>}
        <TestMaker type={qType} updateMarks={updateMarks} marks={marks} modalHandler={modalHandler} title={title} date={date} startTime={startTime} endTime={endTime} index={index} offset={offset} topic={topic} uploadUrl={uploadUrl} setLoading={setLoading}></TestMaker>
      </div>}
      </div>
    </div>
  );
};
export default Index;
