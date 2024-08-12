import {  useContext, useEffect } from "react"
import { useState } from "react"
import AddData from "./AddData"
import Contacts from "./Contacts"
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditData from "./EditData"
import Loading from "./Loading"
import {  ProgressFnc } from "../App"

import '../assets/MainUi.css'
import Navbar from "./Navbar"

import PageUi from "./PageUi"


const MainUi = () => {

    const [data,setdata] = useState(()=>{
        // return JSON.parse(localStorage.getItem("data")) 
        return []
    })
    
    const [userInp, setuserInp] =  useState({
        name :"",
        number:""
    })

    var Progress = useContext(ProgressFnc)
    

    var getdata = async () =>{
        var res = await axios.get("https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts")
        setdata(res.data)
        console.log(res.data)
    }

    useEffect(()=>{
        getdata()
    },[])

    const handleinp = (e) =>{
        console.log(userInp)
        if(e.target.name == "name")
            setuserInp({...userInp,name:e.target.value})
        if(e.target.name == "number")
            setuserInp({...userInp,number:e.target.value})
        // console.log(userInp)
    }

    // Function that adds new data to the data state 
    var handleSubmit =async () =>{
        // setdata((prev)=>{
        //     return [...prev,userInp]
        // })
        var a = await axios.post(`https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts`,{name:userInp.name,number:userInp.number})
        console.log(a)
        setuserInp({name:"",number:""})
        if(a.status == 201)
        {
            getdata()
        }
        Progress()
    }
    
    var del = async (id)=>{
        console.log(data)
        console.log(id)
        // const updatedList = data.filter((elem,idx)=>idx != id)
        // console.log(updatedList)
        // setdata(updatedList)
        var a = await axios.delete(`https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts/${id}`)
        console.log(a)
        if(a.status == 200)
        {
            Progress()
            getdata()
        }
    }

    


  return (
    <>
        <div className="w-full h-full bg-zinc-900">
            <Loading/>
            <Navbar/>
            <div className="w-full bg-slate-200 h-[83%] flex">
                <AddData handlefunctions={[handleinp,handleSubmit,userInp]}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Contacts data_del={[data,del]} />}/>
                        <Route path="/Edit" element={<EditData rerender={getdata}/>}/>
                        <Route path="*" element={<PageUi header="404 NOT FOUND" />} />
                    </Routes>
                </BrowserRouter>
            </div>
            
        </div>
    </>
  )
}

export default MainUi
