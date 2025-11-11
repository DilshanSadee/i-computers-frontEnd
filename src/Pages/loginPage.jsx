import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function login() {
    console.log("login button clicked");


    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(res.data);
      
      localStorage.setItem("token", res.data.token)


      if (res.data.role == "admin") {
        //window.location.href = "./admin";
        navigate("/admin")
      } else {
        navigate("/")
      }
      toast.success("sucggg");
    } catch (err) {
      console.log("error during log");
      console.log(err);
      toast.error("err");
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
          <h1 className="text-[40px] mb-[20px] m-[50px] font-bold text-fuchsia-700 text-shadow-white text-shadow-2xs ">
            login
          </h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("email change");
            }}
            type="Email"
            placeholder="your Email"
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
          <p className="text-black italic w-full text-right mb-[20px] ">
            forget Your Password?{" "}
            <Link to="./forgetPassword" className="text-blue-600 not-italic">
              {" "}
              Rest it here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] bg-accent text-white border-[2px] border-accent hover:bg-transparent rounded-lg hover:text-accent  "
          >
            Login
          </button>
          <p className="text-black italic ">
            don't have an account?{" "}
            <Link to="./register" className="text-blue-600 not-italic">
              {" "}
              login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
