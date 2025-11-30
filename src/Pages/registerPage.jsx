import axios from "axios";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../componentes/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassoword, setConfirmedpassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setISLoading] = useState(false)

  async function register() {

    if(firstName.trim() == ""){
        toast.error("first Name Required")
        return;
    }if(lastName.trim() == ""){
        toast.error("last Name Required")
        return;
    }if(email.trim() == ""){
        toast.error("email Required")
        return;
    }if(password.trim() == ""){
        toast.error("password Name Required")
        return;
    }if(password !== confirmedPassoword){
        toast.error("password don not match")
        return;
    }
    setISLoading(true)
    try {
       await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/",
        {
          email: email.trim(),
          password: password.trim(),
          firstName:firstName.trim(),
          lastName : lastName.trim(),
        }
      );
      toast.success("register succuesfull");
      setISLoading(false)
      navigate("/login")
    } catch (err) {
      console.log("error during register");
      toast.error("err");
      setISLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[url(./bg.jpg)] bg-center bg-cover bg-no-repeat flex ">
      <div className="w-[50%] h-full flex  flex-col justify-center items-center text-shadow-accent">
        <img
          src="./logo.png "
          className="w-[300px] h-[100px] object-cover"
          alt=""
        />
        <h1 className="text-[50px] text-cyan-700 text-center">
          Precision. Power. Protection
        </h1>
        <h2 className="text-[30px] text-white font-semibold italic">
          Precision. Power. Protection
        </h2>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] mb-[20px] p-[40px] backdrop-blur-2xl shadow-2xl rounded-3xl flex flex-col items-center justify-center">
          <h1 className="text-[40px] mb-[0px] m-[50px] font-semibold text-fuchsia-700 text-shadow-white text-shadow-2xs ">
            Register
          </h1>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="your first name"
            className=" w-full h-[50px] p-[10px] m-[20px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="your last name"
            className=" w-full h-[50px] p-[10px] m-[20px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="your email"
            className=" w-full h-[50px] p-[10px] m-[20px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <input
          
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("pasword change");
            }}
            type="Password"
            placeholder="your password"
            className=" w-full h-[50px] p-[10px]  mb-[20px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <input
            onChange={(e) => {
              setConfirmedpassword(e.target.value);
            }}
            type="Password"
            placeholder="confirm your password"
            className=" w-full h-[50px] p-[10px]  mb-[20px] border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
         
          <button
            onClick={register}
            className="w-full h-[50px] bg-accent text-white border-[2px] border-accent hover:bg-transparent rounded-lg hover:text-accent  "
          >
            Register
          </button>
          <p className="text-black italic ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 not-italic">
              {" "}
              login here
            </Link>
          </p>
        </div>
      </div>
            {isLoading && <Loader/>}
    </div>
  );
}
