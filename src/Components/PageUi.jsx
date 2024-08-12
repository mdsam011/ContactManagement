// this is a Common Page for all Home, About , Sevices and Products it Accepts a Prop form App.jsx
// This Prob is coming from the Routes that are Using This Page Again and Agin with Different headings
// so no need to Use Similar seprate Components

// import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AnimFnc } from '../App'
// eslint-disable-next-line react/prop-types
const PageUi = ({ header }) => {
    let anim = useContext(AnimFnc)
    return (
        <>
            <div className="flex flex-col gap-2 text-cyan-400 h-full  justify-center  items-center w-3/5 bg-zinc-800">
                <h1 className='text-6xl'>{header}</h1>
                <br />
                < Link to="/" > <button onMouseDown={anim} className=' text-xl px-6 py-1 rounded-xl border-2 border-cyan-400 hoverMotion'>Go Back</button></Link>
            </div>
        </>
    )
}

export default PageUi