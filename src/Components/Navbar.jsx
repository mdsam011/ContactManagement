import gsap from "gsap";
import { useEffect, useRef } from "react";


const Navbar = () => {

    // Ref element to point to the nav Bar which is used by GSAP
    const navRef = useRef("")
    // GSAP for the nav Animations
    useEffect(() => {
        let nav1 = gsap.context(() => {
            gsap.from(navRef.current, { 
                x:-300,
                duration:1,
                opacity: 0
            });
        });
        return ()=>{nav1.revert()}
    }, []);    

  return (
    <>
          <div id="nav"  className=" w-full bg-black h-[15%] flex items-center justify-between px-[3%] text-cyan-500">
              <div id="nav1" ref={navRef} className="flex justify-center items-center gap-3">
                  <img className='w-[38px] h-[40px] object-cover' src="https://img.freepik.com/premium-vector/address-book-icon-vector-template-logo-trendy-collection-flat-design-gold_917138-11245.jpg" alt="" />
                  <h1 id="navhead" className="text-4xl">Contact Management</h1>
              </div>
          </div> 
    </>
  )
}

export default Navbar
