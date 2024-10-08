import { useContext, useRef } from "react"
import { AnimFnc } from "../App"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

import '../assets/AddData.css'

// eslint-disable-next-line react/prop-types
const AddData = ({handlefunctions}) => {
  
    var inputstyle = `flex flex-col items-start self-center text-3xl gap-4`

    
    // Referencing 2nd input field using useRef to gain some functionality when an event occurs
    var refinp2 = useRef("")

    // Destructing the props sent from the MainUi.jsx Component
    const [handleinp,handleSubmit,userInp,refinp1] = handlefunctions

    var Anim = useContext(AnimFnc)

    var container = useRef()

    useGSAP(()=>{
        gsap.from("#addhead",{
            opacity:0,
            scale:0,
            duration:1
        })
        
        gsap.from("#ConInputs",{
            opacity:0,
            x:-200,
            duration:1,
            stagger:0.5
        })

    })

    return (
    
    <>
        <div ref={container} id="col1" className="bg-cyan-500 w-[40%] h-full p-10 flex flex-col justify-center items-start  gap-3">
                <h2 id="addhead" className="bg-black text-cyan-200 px-8 py-2 rounded-xl text-5xl font-bold self-center mb-[20px]">Add Data</h2>
                <div id="ConInputs" className={inputstyle}>
                    <label className="pl-2" htmlFor="">Name  </label>
                    <input ref={refinp1} onKeyDown={(e)=>e.key == "Enter" ?refinp2.current.focus():""} className="addIput" onChange={handleinp} type="text" name="name" value={userInp.name} id="" />
                </div>
                <div id="ConInputs" className={inputstyle}>
                    <label className="pl-2" htmlFor="">Number</label>
                    <input ref={refinp2} className="addIput" onKeyDown={(e)=>{e.key=='Enter'?handleSubmit():""}} onChange={handleinp} type="text" name="number" value={userInp.number} id="" />
                </div>
                 <button id="addbtn" onClick={handleSubmit} onMouseDown={Anim}  className="bg-zinc-900 px-10 py-2 mt-[20px] text-white self-center rounded-2xl">Submit</button>
        </div>

    </>
  )
}

export default AddData
