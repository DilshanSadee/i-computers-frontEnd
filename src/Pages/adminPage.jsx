import { Route, Routes } from "react-router-dom";
import { BsBoxSeam, BsCardList } from "react-icons/bs";
import { FiUserMinus } from "react-icons/fi";
import { MdReviews } from "react-icons/md";

export default function AdminPage(){
    return(
        <div className="w-full h-full bg-primary flex ">
            <div className="w-[300px] h-full bg-primary border-white">
                <div className="w- h-[100px] bg-amber-200 flex items-center font-bold border-2">
                    <img src="/logo.png" className="h-full" />
                    <h1>Admin Pannel</h1>
                    
                </div> 
                <div className="w-full h-[400px] text-black flex flex-col text-2xl pl-[20px] ">
                    <a href="/admin" className="w-full flex items-center h-[50px] gap-[10px]"> <BsCardList /> Orders</a>
                    <a href="/admin/products"className="w-full flex items-center h-[50px] gap-[10px]"> <BsBoxSeam /> products</a>
                    <a href="/admin/users"className="w-full flex items-center h-[50px] gap-[10px] "><FiUserMinus />Users</a>
                    <a href="/admin/reviews"className="w-full flex items-center h-[50px] gap-[10px]"><MdReviews />Reviews</a>
                </div>
            
            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full text-4xl ">
                <div className="w-full h-full max-h-full overflow-y-scroll border-[10px] border-accent rounded-2xl pl-[20px] ">
                   <Routes  >
                        <Route path="/" element={<h1> Orders</h1>}></Route>
                        <Route path="products" element={<h1>products</h1>}></Route>
                        <Route path="users" element={<h1>Users</h1>}></Route>
                        <Route path="reviews" element={<h1>reviews</h1>}></Route>

                   </Routes>
                </div>
            </div>
        </div>


    )
}