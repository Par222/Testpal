import { useRouter } from "next/router";
import React from "react";
const NavBar=()=>{
    const router=useRouter()
    return(
        <div className="bg-orange-500 flex justify-between items-center py-2">
            <div className="font-extrabold text-3xl px-5 py-2 text-white w-[60%]">
                TesPal
            </div>
            <nav className="text-white flex space-x-5 w-[30%] justify-between px-5 py-2 cursor-pointer items-center">
                <span className="hover:border-b-2 border-white ">Home</span>
                <span className="hover:border-b-2 border-white ">Create Quiz</span>
                <span className="hover:border-b-2 border-white">History</span>
                <span className="hover:border-b-2 border-white">Profile</span>
                <button className="bg-white text-orange-500 px-5 py-1 rounded-sm" onClick={()=>router.push('/login')}>Logout</button>
            </nav>
        </div>
    )
}
export default NavBar;