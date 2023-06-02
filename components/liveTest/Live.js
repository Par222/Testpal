import { useContext, useState } from "react";
import { TestContext } from "../context/TestContext";
import { useRouter } from "next/router";
const Live = () => {
  const [click, setClick] = useState(false);
  const [details, setDetails] = useState(false);
  const [index, setIndex] = useState(0);

  const ctx = useContext(TestContext);
  console.log(ctx.testData);
  const router=useRouter()
  return (
    <div className="rounded-md shadow-md py-2 ">
      <img
        src="https://www.gannett-cdn.com/media/2021/07/23/Bedford/47aed60cc037187d5664d38cd1319c4e.jpg?width=660&height=439&fit=crop&format=pjpg&auto=webp"
        className="h-[240px] w-[500px]"
      ></img>
      <h1 className="my-2 font-extrabold text-xl mx-3">
        Live And Upcoming Test
      </h1>
      <button
        className=" my-4 bg-orange-500 text-white py-2 px-1 rounded-sm mx-[20%] w-[50%]"
        onClick={() => setClick(!click)}
      >
        Check Active Test
      </button>

      <div>
        {click && (
          <div className="my-2 mx-3 border-b-2 border-orange- py-2 flex justify-between">
            <div>
              <div className="flex flex-col ">
                <span className="text-lg font-extrabold text-orange-500 ">
                  {ctx.testData.data.name}
                </span>
                <span className="text-xs font-bold">
                  {ctx.testData.data.subject}
                </span>
                {details && ctx.testData && (
                  <>
                    <div className="text-sm text-orange-500 my-1 font-semibold">
                      {ctx.testData.data.marks + "  " + "Marks"}
                    </div>

                    <div className="text-sm flex items-center space-x-16">
                      <span>{ctx.testData.data.date}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      
                        width={15}
                        height={15}
                      >
                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
                      </svg>
                    </div>
                    <div className="my-1">
                      <div className="text-sm  flex space-x-2 items-center">
                        <span>
                          {ctx.testData.data.start +
                            " - " +
                            ctx.testData.data.end}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={15}
                          height={15}
                        >
                          <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex space-x-[72px] items-center">
                      <div className="text-sm ">{ctx.testData.data.title}</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height={15}
                        width={15}
                      >
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 mx-4">
              <button
                className="bg-green-400 text-white py-1 px-2 w-[120px] rounded-sm h-[40px] "
                onClick={() => {
                  setDetails(!details);
                }}
              >
                {details ? "Hide Details" : "Show Details"}
              </button>
              <button className="bg-orange-500 text-white py-1 px-2 w-[120px] rounded-sm h-[40px]" onClick={()=>router.push('/quiz/onboard')}>
                Start Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Live;
