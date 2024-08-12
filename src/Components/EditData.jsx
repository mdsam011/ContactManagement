import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AnimFnc, ProgressFnc } from "../App"

import '../assets/AddData.css'

// eslint-disable-next-line react/prop-types
const EditData = ({rerender}) => {

    var inputstyle = `flex flex-col self-center items-start text-3xl gap-2`

    var Progress = useContext(ProgressFnc)
    var Anim = useContext(AnimFnc)


    const [userInp,setuserInp] = useState({})

    var loc = useLocation()
    var nav =  useNavigate()

    useEffect(()=>{
        console.log(loc.state)
        axios.get(`https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts/${loc.state}`)
        .then((res)=>{
            console.log(res.data)
            setuserInp(res.data)
        })
        .catch((err)=>{
            console.log("Error",err)
        })
    },[])

    var handle = async (e) =>{
        if(e.target.id == "submit")
        {
            console.log("submit")
            var  res = await axios.put(`https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts/${loc.state}`,userInp)
            if(res.status == 200)
            {
                nav("/")
                rerender()
            }
            Progress()
            
        }
        if(e.target.id == "back")
            {
            Progress()
            nav("/")
            console.log("go back")
        }
    }

    var HandleInput = (e) =>{
        if(e.target.name ==  "name")
            setuserInp({...userInp,name:e.target.value})
        if(e.target.name ==  "number")
            setuserInp({...userInp,number:e.target.value})
    }

  return (
    <>
        
        <div id="col2" className="bg-black w-3/5 overflow-hidden h-full flex items-center justify-center">
                <div  className="bg-cyan-500 border-solid flex flex-col justify-center gap-3 border-black rounded-2xl border-2 w-[80%]  h-[84%]">
                <h2 className="text-5xl font-bold self-center self mb-[30px]">Edit Data</h2>
                <div className={inputstyle}>
                      <label className="pl-2" htmlFor="">Name  </label>
                    <input className="addIput" onChange={HandleInput}  type="text" name="name" value={userInp.name}  id="" />
                </div>
                <div className={inputstyle}>
                      <label className="pl-2" htmlFor="">Mobile Number </label>
                      <input className="addIput" onChange={HandleInput} type="text" name="number" value={userInp.number} id="" />
                </div>
                <div className="flex gap-2 self-center">

                 <button onMouseDown={Anim} onClick={handle} id="submit" className="bg-zinc-900 self-center px-10 py-2 mt-[20px] text-white rounded-2xl">Submit</button>
                 <button onMouseDown={Anim} onClick={handle}  id="back" className="bg-zinc-900 self-center px-10 py-2 mt-[20px] text-white rounded-2xl">Go Back</button>
                </div>
                </div>
            
            </div>
    </>
  )
}

export default EditData
