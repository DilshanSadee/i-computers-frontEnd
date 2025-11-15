import { Link } from "react-router-dom";
import UserData from "./userData";
import { BiShoppingBag } from "react-icons/bi";

export default function Header(){
    return(
        <header className="w-full h-[125px] bg-accent flex relative">
            <img src="./logo.png" className="h-full" alt="logo" />
                <div className="w-full h-full flex justify-center items-center border-white gap-[10px]">
                    <Link to="/" >Home </Link>
                    <Link to="/products" >products </Link>
                    <Link to="/about" >About </Link>
                    <Link to="/contact" >Contact </Link>

                </div>
                <Link to ="/cart" className=" absolute right-4 top-1/2 text-white text-2xl">
                <BiShoppingBag/>
                </Link>
        </header>
    )
}