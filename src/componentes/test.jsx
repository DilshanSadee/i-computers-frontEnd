import { useState } from "react";

export default function Test(){

    const[count, setCount] = useState(0)
    const [status,setStatus] = useState("OFF")


    return(
        <div className="w-full h-full flex flex-col justify-center items-center  ">
            <div className=" w-[400px] h-[300px] flex justify-center items-center shadow-2xl">
                <button className="w-[100px] h-[50px] bg-red-600 text-white" onClick={
                    ()=>{
                        
                        setCount(count - 1)
                    }
                }>
                    decrement
                </button>
                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>
                <button className="w-[100px] h-[50px] bg-blue-600 text-white" onClick={
                    ()=>{
                        setCount(count + 1 )
                        
                    }
                }>
                    increment
                </button>
            </div>
            <div className=" w-[400px] h-[300px] flex justify-center items-center shadow-2xl font-bold flex-col ">
                <span className="w-[30px] h-[30px] text-2xl">
                    {status}
                </span>
                <div className=" h-[30px] bg-blue-400 flex justify-center">
                    <button className="w-[100px] h-full bg-red-600 text-white" onClick={
                        ()=>{
                            setStatus ("off")
                        }
                    }>OFF</button>
                    <button className="w-[100px] h-full bg-green text-white"onClick={
                        ()=>{
                            setStatus ("on")
                        }
                    }>ON</button>

                </div>

            </div>
            
        </div>
    )
}