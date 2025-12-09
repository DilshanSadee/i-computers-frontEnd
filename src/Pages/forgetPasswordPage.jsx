import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import Loader from "../componentes/loader";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage(){

    const [otpSent,setOtpSent] =useState(false);
    const [email,setEmail] = useState("");
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false);  
    const navigate =useNavigate();

        async function resetPassword() {
            if ( newPassword !== confirmPassword){
                toast.error("password do not match");
                return
            }

            setLoading(true)
             try {
                await axios.post( import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                    email : email,
                    otp : otp,
                    newPassword : newPassword
                })
                toast.success("password rest succesfull")
                setLoading(false)
                navigate("/login")

             } catch (err) {
                console.log(err);
                toast.error("password update failed")
                
                setLoading(false)
            
             }
        }
        

        async function sendOtp() {
            setLoading(true)

            try {
                await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email ,{
                        email : email
                    }
                )
                toast.success("OTP send to your email");
                setOtpSent(true)
                setLoading(false)
                
                
            } catch (err) {
                console.log(err);
                toast.error("errpr sending OTP"),
                setLoading(false)
                
                
                
            }
        }





    return(
    <div className="w-full h-full flex flex-col justify-center items-center">

        {
             loading && (
                <Loader/>
             )
        }
        {
            otpSent ? 
            (
                <div className="w-[400px] h-[500px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 ">Reset OTP and New Password</h2>

                    <input type="text"
                    placeholder="Enter OTP"
                    className=" w-full p-2 mb-4 border border-gray-400 rounded"
                    onChange={(e) => setOtp(e.target.value)} />

                     <input type="password"
                    placeholder="Enter New Password"
                    className=" w-full p-2 mb-4 border border-gray-400 rounded"
                    onChange={(e) => setNewPassword(e.target.value)} />

                     <input type="password"
                    placeholder="Enter New Confirm Password"
                    className=" w-full p-2 mb-4 border border-gray-400 rounded"
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                    
                    <button 
                    onClick={resetPassword}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ">
                        Reset the PAssword
                    </button>

                    
                </div>
            ):
            <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8  ">
                <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
                <input type="email"
                placeholder="Enter Your Email"
                className="w-full p-2 border border-gray-300 mb-4 rounded"
                onChange={(e)=> setEmail(e.target.value)} />

                <button onClick={sendOtp}
                    className="w-full bg-blue-500 p-2 rounded hover:bg-blue-800 text-white"
                    >Send OTP </button>

            </div>
        }
    </div>
    )
}