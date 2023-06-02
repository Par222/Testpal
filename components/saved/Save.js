import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/router"
const Save=()=>{
    const ctx=useContext(AuthContext)
     const [save,setSave]=useState(ctx.savedTest)
     console.log(save)
     const router=useRouter()
     return(
        <div>
            {
                save.map((t)=>{
                    return(
                        <div className="flex shadow-md rounded-md justify-evenly w-[50%] my-4 py-3 px-4 items-center">
                        <div className="flex flex-col">
                            <span className="text-orange-500 text-xl font-bold">{t.data.name}</span>
                            <span className="text-sm font-medium"> {t.data.subject}</span>
                            <span className="text-xs"> {t.data.title}</span>
                        </div>
                        <div><span>Marks Scored:</span><span className="mx-1 font-bold">{t.score+"/"+t.data.marks}</span></div>
                        <button className="bg-green-400 text-white font-bold py-2 px-4 rounded-sm" onClick={()=>router.push('/quiz/onboard')}>Re-Attempt Test</button>
                        </div>
                    )
                })
            }
        </div>
     )
}
export default Save