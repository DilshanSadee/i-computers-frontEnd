import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { LuListCollapse } from "react-icons/lu";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className="w-full h-[125px] bg-accent flex relative">
      <LuListCollapse
        onClick={() => {
          setSideBarOpen(true);
        }}
        className="text-black my-auto text-2xl ml-6 lg:hidden z-10"
      />

      <img src="./logo.png" className="h-full" alt="logo" />
      <div className="w-full h-full hidden lg:flex justify-center items-center border-white gap-[10px]">
        <Link to="/">Home </Link>
        <Link to="/products">products </Link>
        <Link to="/about">About </Link>
        <Link to="/contact">Contact </Link>
      </div>
      <Link
        to="/cart"
        className=" absolute right-4 top-1/2 text-white text-2xl"
      >
        <BiShoppingBag />
      </Link>
      {sideBarOpen && (
        <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300 ">
          <div className="bg-white w-[300px] h-screen flex-col relative  ">
            <div className="absolute w-full h-full bg-white  left-[-300px] translate-x-[300px] transform-flat transition-transform duration-1000 flex flex-col">
              <div className="w-full h-[125px] bg-accent flex justify-center items-center  ">
                <img src="./logo.png" className="h-full" alt="logo" />
                <LuListCollapse
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                  className="text-black my-auto text-2xl  lg:hidden rotate-180 "
                />
               
              </div>
              <div className="ml-4 mt-4 flex flex-col justify-center gap-4" >
                 <a
                  href="/"
                  class="text-gray-700 hover:text-black font-medium transition"
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                  
                >
                  Home
                </a>
                <a
                  href="/products"
                  class="text-gray-700 hover:text-black font-medium transition"
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                >
                  Products
                </a>
                <a
                  href="/about"
                  class="text-gray-700 hover:text-black font-medium transition"
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                >
                  About
                </a>
                <a
                  href="/contact"
                  class="text-gray-700 hover:text-black font-medium transition"
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
