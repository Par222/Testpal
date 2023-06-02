import { useRouter } from "next/router";
import { useState } from "react";

const Teachers = () => {
  const [teacher, setTeacher] = useState([]);
  const [search, setSearch] = useState("");
  const [details,setDetails]=useState(false)
  let teachers = [
    {
      name: "Aparna Halbe",
      dep: "IT Department",
      image: "",
      course: "DA 2022-2023",
    },
    {
      name: "Varsha Hole",
      dep: "IT Department",
      image: "",
      course: "AIML 2022-2023",
    },
    {
      name: "Pramod Bide",
      dep: "COMPS Department",
      image: "https://media.licdn.com/dms/image/C5103AQGlJioHGWxsyA/profile-displayphoto-shrink_800_800/0/1548303324520?e=2147483647&v=beta&t=KctZL4Cf8w7OJlOawefP-uLpuI3TPYEk3xDvHUfz9ms",
      course: "ADBMS 2022-2023",
    },
  ];
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(search);
    for (let t of teachers) {
      if (t.name.includes(search)) setTeacher([...teacher, t]);
    }
  };
  const router=useRouter()
  return (
    <>
      <div className="rounded-md shadow-md py-2 ">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/894/331/686/5c1ca0fce5a58-wallpaper-preview.jpg"
          className="h-[240px] w-[500px]"
        ></img>
        <h1 className="my-2 font-extrabold text-xl mx-3">Find Your Teachers</h1>
        <form className="my-5 flex items-center">
          <input
            placeholder="Search teacher"
            className="mx-4 py-2 px-3 w-[70%] rounded-sm focus:outline-none border-b-2 border-orange-500"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={20}
            height={20}
            className="translate-x-[-45px] cursor-pointer"
            onClick={submitHandler}
            
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </form>
        {teacher &&
          teacher.map((s) => {
            return (
              <div className="flex items-center  border-b-2 border-slate-200 mx-5 my-3">
                <img src={s.image}className="rounded-full" height={50} width={50}></img>
                <div className="mx-2 py-2 flex flex-col">
                  <span className="text-lg font-extrabold text-orange-500 ">
                    {s.name}
                  </span>
                  <div className="flex space-x-2 items-center">
                    <span className="text-xs font-bold">{s.dep}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      height={20}
                      width={20}
                    >
                      <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                    </svg>
                  </div>
                  {details && <div>
                    <span className="text-sm">{s.course}</span>
                    </div>}
                </div>
                <div>
                  <div className="flex items-center space-x-4 mx-4">
                    <button
                      className="bg-green-400 text-white py-1 px-2 w-[120px] rounded-sm h-[40px] "
                     onClick={()=>setDetails(!details)}
                    >
                      {details  ? "Hide Courses" : "Show Courses"}
                    </button>
                    <button className="bg-orange-500 text-white py-1 px-2 w-[120px] rounded-sm h-[40px]" onClick={()=>router.push('/quiz/saved')}>
                      Show Tests
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Teachers;
