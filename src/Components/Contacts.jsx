import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { AnimFnc, ProgressFnc } from "../App"
import '../assets/Contact.css'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

// eslint-disable-next-line react/prop-types
const Contacts = ({data_del}) => {

    // Destructing the props sent from the MainUi.jsx Component
    var [data,del] = data_del

    // Progress and Anim Function Coming From App.jsx using UseCOntext
    var Progress =useContext(ProgressFnc)
    var Anim =useContext(AnimFnc)

    // useNaviagte hook that is used to rendered components based on the path and can also take data with it
    var nav = useNavigate()
    
    //Edit Function that handles editing the data
    //Each Editing Icon has the id same as the data ,so whenever the user clicks on the Edit Button,
    // its is also passed whih the help of a callback
    // after this the Component at path=/edit is rendered and the id is also sent to that component using
    // useNavigate hook 
    var edit = (id) =>{
        Progress()
        nav('/Edit',{state:id})
    }

  const trref = useRef()

    useGSAP(()=>{ 
      gsap.from("#conthead",{
        opacity:0,
        duration:1,
        y:-200,
        rotate:360
      })

      var tl = gsap.timeline()
      tl.from("table thead tr",{
        opacity: 1,
        duration: 1,
        y: -100,
      })

      tl.from("table thead tr th",{
        opacity:0,
        duration:1,
        stagger:0.3,
        x:-100,
        
      })
      
    },{scope:trref})

  return (
    <>
      <div ref={trref} id="col2" className=" bg-zinc-950 w-3/5 overflow-hidden h-full flex flex-col items-center justify-center">
        <h2 id="conthead" className="contactheading mb-2">Contact List</h2>
                <div id="tab" className="border-solid border-l-cyan-500 w-[80%] overflow-y-scroll h-[84%]">
                  <table className="w-full border-separate">
                    <thead>
                      <tr className="bg-zinc-900 text-white">
                        <th className="border-b-2 border-black p-2">Name</th>
                        <th className="border-b-2 border-black p-2">Number</th>
                        <th className="border-b-2 border-black p-2">icons</th>
                      </tr>
                    </thead>
                    <tbody >
                        {data.map((elem)=>(
                            <tr key={elem.id} className="even:bg-zinc-900 odd:bg-cyan-600 text-white">
                                <td className="border-b border-black p-2 text-center">{elem.name}</td>
                                <td className="border-b border-black p-2 text-center">{elem.number}</td>
                                <td className="border-b border-black p-2 text-center">
                                    <button onMouseDown={Anim} onClick={()=>del(elem.id)} className="px-4" id={elem.id}>❌</button>
                                    <button onMouseDown={Anim} onClick={()=>edit(elem.id)} id={elem.id}>📝</button>
                                </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            
            </div> 
    </>
  )
}

export default Contacts
