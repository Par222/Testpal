import NavBar from "../../../components/common/NavBar"
import Save from "../../../components/saved/Save"
const Index=()=>{
    return(
        <>
         <NavBar></NavBar>
          <div className="mx-10 my-8">
            <div className="my-3 font-bold text-2xl">Your Saved Test</div>
                      <Save></Save>
          </div>
        </>
         
    )
}
export default Index
