import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/context/AuthContext"

const Index=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [auth,setAuth]=useState('Student')
    const router=useRouter()
    const ctx=useContext(AuthContext)   
    const submitHandler=(e)=>{
        e.preventDefault()
        let cred={
            email,password,auth
        }
        ctx.credentialHandler(cred)
        if(auth=='Student')
        router.push('/students/home')
        else
        router.push('/quiz/create')
    } 
    useEffect(()=>{
        console.log(ctx.login)
    },[ctx.login])
    return(
        <div className="flex justify-center items-center h-[100vh] drop">
          
            <form className="flex flex-col px-5 w-[30%] text-white bg-orange-500 rounded-md py-2 opacity-90  " onSubmit={submitHandler}>
            <h1 className="mt-4 text-3xl">Join Us Today at TestPal</h1>
            <div className="text-sm my-6 font-medium flex space-x-5 cursor-pointer text-white">
                <span className={auth=='Student'?"pb-1 border-b-4 border-white text-orange-200":""} onClick={()=>setAuth('Student')}>Student </span>
                <span  className={auth=='Teacher'?"pb-1 border-b-4 border-white text-orange-200":""} onClick={()=>setAuth('Teacher')}>Teacher</span>
            </div>
            <label htmlFor="email" className="text-sm font-bold">
             Email
            </label>
            <input type="email" required={true} name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="py-1 px-2 focus:outline-none border-b-2 border-white bg-orange-500 "></input>
            <label htmlFor="pass" className="text-sm font-bold mt-5" >
             Password
            </label>
            <input type="password" required={true} name="pass" value={password} onChange={(e)=>setPassword(e.target.value)} className="py-1 px-2 focus:outline-none border-b-2 border-white bg-orange-500"></input>
            <button className="mt-10 mb-4 bg-white text-orange-500 py-1 px-4 w-[50%] rounded-sm font-medium mx-[25%]" type="submit">Log In</button>
            </form>
        </div>
    )
    
}
export default Index