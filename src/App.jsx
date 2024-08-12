import { createContext } from "react"
import Mainui from "./Components/MainUi"
import gsap from "gsap"

let ProgressFnc = createContext()
let AnimFnc = createContext()

const App = () => {



  var Progress = () => {
    var load = document.querySelector("#load")
    var p = gsap.to(load, {
      width: "100%",
      duration: 0.3
    })
    setTimeout(()=>{
      p.kill()
      load.style.width = "0%"
    },300)
  }

  var anim = (e)=>{
    console.log("Anim Function",e.target)
    e.target.style.transition = ".3s"
    e.target.style.transform = "scale(0.7)"
    e.target.style.filter = "brightness(0.4)"
    setTimeout(()=>{
      e.target.style.transform = "scale(1)"
      e.target.style.filter = "brightness(1)"
    },100)
  }

  return (
    
    <div className="w-full h-full">
          
        <AnimFnc.Provider value={anim}>
          <ProgressFnc.Provider value={Progress}>
            
               <Mainui/>
               
          </ProgressFnc.Provider>
        </AnimFnc.Provider>
    </div>
  )
}

export default App
export {ProgressFnc,AnimFnc}
