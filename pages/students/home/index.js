import NavBar from "../../../components/common/NavBar";
import Live from "../../../components/liveTest/Live";
import Teachers from "../../../components/teachers";

const Index = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex">
        <div className="mx-10 my-10 w-[20%] h-[400px] rounded-sm shadow-md">
          <div className="h-[30%] w-full bg-slate-100">
            <div className="flex items-center translate-x-20  translate-y-16 border-[10px] border-orange-500 rounded-full h-[120px] w-[120px]">
              <img
                src="https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU="
                className="h-[100px] w-[100px] rounded-full p-1"
              ></img>
            </div>
            <div className="my-20 mx-5">
              <div className="flex flex-col">
                <div className="flex justify-between my-2">
                  <span className="text-orange-500 font-bold">Name </span>
                  <span>Paras Mehta</span>
                </div>
                <div className="flex justify-between my-2">
                  <span className="text-orange-500 font-bold">Year </span>
                  <span>TY COMPS</span>
                </div>
                <div className="flex justify-between my-2">
                  <span className="text-orange-500 font-bold">UID </span>
                  <span>2020300038</span>
                </div>
                <button className="bg-orange-500 my-3 text-white rounded-md py-1">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 mx-5">
          <Live></Live>
        </div>
        <div className="my-10 mx-5">
          <Teachers></Teachers>
        </div>
      </div>
    </>
  );
};
export default Index;
