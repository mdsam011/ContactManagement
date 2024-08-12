import {  useContext, useEffect, useRef } from "react"
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

    // State that Recieves Data From the Mock Api
    const [data,setdata] = useState(()=>{
        // return JSON.parse(localStorage.getItem("data")) 
        return []
    })
    
    // State to to store the Temporary UserInputs
    const [userInp, setuserInp] =  useState({
        name :"",
        number:""
    })

    // Ref Element Which Points to the Name Input Inside the AddData Component 
    var refinp1 = useRef("")

    // Using The Progress Function Defined in the App Componenet using UseContext Hook
    var Progress = useContext(ProgressFnc)
    
    // Function Ehich Does a Asynchronous Call the the API to get the Data
    var getdata = async () =>{
        var res = await axios.get("https://66b429ba9f9169621ea1ece1.mockapi.io/Contacts")
        setdata(res.data)
        console.log(res.data)
    }

    // UseEffect Hook Invokes the Getdata Function at the First Render of this Component
    // it Make Sures that we get Data When Our COmponent is Being rendered
    useEffect(()=>{
        getdata()
    },[])

    // Handles the Input Fields of the AddData Component 
    const handleinp = (e) =>{
        console.log(userInp)
        if(e.target.name == "name")
            setuserInp({...userInp,name:e.target.value})
        if(e.target.name == "number")
            setuserInp({...userInp,number:e.target.value})
        // console.log(userInp)
    }

    // Function to Submitting Data and Storing the data to the MOCK SERVER using API
    // inside this if the request is successful then we render the component using getdata method,
    // because we know whenever the state changes the component will rerednder
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
        console.log("hello ref1 ",refinp1.current)
        refinp1.current.focus()
    }
    
    // Function Which Deletes the Data Stored on Mock Server with API through an Async delete Request
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
                <AddData handlefunctions={[handleinp,handleSubmit,userInp,refinp1]}/>
                {/* Routes for different operations */}
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
