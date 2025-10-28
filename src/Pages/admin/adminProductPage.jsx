import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminProductPage(){
    return(
        
        <div className="w-full h-full flex items-center justify-center relative">
            product Page
            <Link to= "/admin/add-product" className="absolute right-[20px] bottom-[20px]  w-[50px] h-[50px] flex justify-center items-center border-[2px] rounded-full hover:text-amber-500 hover:bg-accent " ><BiPlus/></Link>
        </div>
    )
}