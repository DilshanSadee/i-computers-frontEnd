import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartTotal } from "../Utilis/cart";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [cart, setCart] = useState(location.state);
  if (location.state === null) {
    navigate("/products");
  }

  function getCartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function submitOrder(){

    const token = localStorage.getItem("token");

    if (token == null){
      toast.error("you must  be logged in to place an a order");
      navigate("/login");
      return;
    }
    const orderItems = []

    cart.forEach((item) => {
        orderItems.push({
            productID :item.productID,
            quantity : item.quantity,
            
        })

    
        
    });

    axios.post(import.meta.env.VITE_BACKEND_URL +"/orders",{
        name : name,
        address : address,
        phone : phone,
        items : orderItems

    },{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }  ).then((response)=>{
        toast.success("order created successfully");
        navigate("/orders")
    }).catch((error)=>{
        toast.error ("error placing order")
    });
    
  }

  return (
    <div className="w-full flex flex-col items-center p-[20px]">
      {cart.map((item, index) => {
        return (
          <div key={index} className="w-full lg:w-[50%] lg:h-[150px] shadow-2xl my-1 relative p-[20px] rounded flex justify-between">
               <h1 className="absolute top-[-15px] lg:hidden w-full overflow-hidden h-[20px] ">{item.name}</h1>
            <div className="h-full flex flex-col"> 
            <img
              src={item.image}
              className="h-[80px] lg:h-full aspect-square object-cover"
            />
            <span className="lg:hidden">{item.labeledPrice > item.price && (
                <h2 className="text-secondary line-through text-lg ">
                  LKR.{item.labeledPrice.toFixed(2)}
                </h2>
              )}

              <h2 className="text-xl text-accent font-semibold mt-2 items-center  ">
                LKR.{item.price.toFixed(2)}
              </h2></span>
            </div>
            <div className="hidden w-[300px] text-2xl lg:flex justify-center pl-4 flex-col  ">
              <h1 className="text-2xl font-semibold item-center  relative hover:[&_.tooltip]:opacity-100 inline-block ">
                <span className=" opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-accent text-white px-2 rounded-full">
                  {item.name}
                </span>
                {item.name.length > 20
                  ? item.name.substring(0, 20) + "..."
                  : item.name}
              </h1>
              {item.labeledPrice > item.price && (
                <h2 className="text-secondary line-through text-lg ">
                  LKR.{item.labeledPrice.toFixed(2)}
                </h2>
              )}

              <h2 className="text-xl text-accent font-semibold mt-2 items-center  ">
                LKR.{item.price.toFixed(2)}
              </h2>
              <h3 className="text-lg mt-2">ProductID:{item.productID}</h3>
            </div>
            <div className="min-h-full flex flex-row items-center gap-4">
              <div className=" h-full flex flex-col justify-center items-center">
                <BiChevronUp
                  onClick={() => {
                    const copiedCart = [...cart];
                    copiedCart[index].quantity += 1;
                    setCart(copiedCart);
                  }}
                  className="text-2xl cursor-pointer hover:text-accent transition "
                />
                <span className="text-lg">{item.quantity}</span>
                <BiChevronDown
                  onClick={() => {
                    const copiedCart = [...cart];
                    copiedCart[index].quantity -= 1;
                    if (copiedCart[index].quantity < 1) {
                      copiedCart.splice(index, 1);
                    }
                    setCart(copiedCart);
                  }}
                  className="text-2xl cursor-pointer hover:text-accent transition "
                />
              </div>
              <span className="pr-8 text-lg font-semibold w-[200px] text-right">
                LKR.{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      <div className="w-full lg:w-[50%] shadow-2xl my-1 rounded p-4 flex flex-col gap-4">

  <div className="flex flex-col w-full">
    <label className="font-semibold mb-1">Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="px-4 py-2 rounded border-2 border-secondary/30 focus:border-accent outline-none"
    />
  </div>

  {/* Phone */}
  <div className="flex flex-col w-full">
    <label className="font-semibold mb-1">Phone Number</label>
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="px-4 py-2 rounded border-2 border-secondary/30 focus:border-accent outline-none"
    />
  </div>

  {/* Address (textarea full width) */}
  <div className="flex flex-col w-full">
    <label className="font-semibold mb-1">Address</label>
    <textarea
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="px-4 py-2 rounded border-2 border-secondary/30 focus:border-accent outline-none h-[100px] resize-none w-full"
    />
  </div>

</div >

      <div className="w-full lg:w-[50%] h-[150px] shadow-2xl my-1  rounded flex justify-between items-center">
        <button
          onClick={submitOrder}
         className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200">
          Place Your Order Now
        </button>

        <span className="pr-4 text-xl font-bold w-[150px] text-right ">
          Lkr.{getCartTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
}
