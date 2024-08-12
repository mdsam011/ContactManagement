import { useContext } from "react"
import { AnimFnc } from "../App"

import '../assets/AddData.css'

// eslint-disable-next-line react/prop-types
const AddData = ({handlefunctions}) => {
  
    var inputstyle = `flex flex-col items-start self-center text-3xl gap-4`

    const [handleinp,handleSubmit,userInp] = handlefunctions

    var Anim = useContext(AnimFnc)

    return (
    
    <>
        <div id="col1" className="bg-cyan-500 w-[40%] h-full p-10 flex flex-col justify-center items-start  gap-3">
                <h2 id="addhead" className="bg-black text-cyan-200 px-8 py-2 rounded-xl text-5xl font-bold self-center mb-[20px]">Add Data</h2>
                <div className={inputstyle}>
                    <label className="pl-2" htmlFor="">Name  </label>
                    <input className="addIput" onChange={handleinp} type="text" name="name" value={userInp.name} id="" />
                </div>
                <div className={inputstyle}>
                    <label className="pl-2" htmlFor="">Mobile Number  </label>
                    <input className="addIput" onChange={handleinp} type="text" name="number" value={userInp.number} id="" />
                </div>
                 <button onClick={handleSubmit} onMouseDown={Anim}  className="bg-zinc-900 px-10 py-2 mt-[20px] text-white self-center rounded-2xl">Submit</button>
        </div>

    </>
  )
}

export default AddData
