import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../Utilis/cart";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full flex flex-col items-center p-[20px]">
      {cart.map((item) => {
        return (
          <div className="w-[50%] h-[150px] shadow-2xl my-1  rounded flex justify-between">
            <img
              src={item.image}
              className=" h-full aspect-square object-cover"
            />
            <div className=" w-[300px] text-2xl flex justify-center pl-4 flex-col  ">
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
            <div className="h-full flex flex-row items-center gap-4">
                <div className=" h-full flex flex-col justify-center items-center">
                    <BiChevronUp 
                    onClick={
                        ()=>{
                            addToCart(item, 1)
                            const newCart = getCart();
                            setCart(newCart)
                        }
                    } className="text-2xl cursor-pointer hover:text-accent transition "/>
                        <span className="text-lg">{item.quantity}</span>
                    <BiChevronDown
                     onClick={
                        ()=>{
                            addToCart(item, -1)
                            const newCart = getCart();
                            setCart(newCart)
                        }
                    }
                    
                    className="text-2xl cursor-pointer hover:text-accent transition "/>
                </div>
                    <span className="pr-8 text-lg font-semibold w-[200px] text-right">LKR.{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        );
      })}
      <div className="w-[50%] h-[150px] shadow-2xl my-1  rounded flex justify-between items-center">
        <Link to="/Checkout" className="self-center ml-4 px-6 py-2 bg-accent text-white hover:bg-accent/90 transition"
            state={
            cart
        }
         >
        
            Checkout
            </Link>
        <span className="pr-4 text-xl font-bold w-[150px] text-right ">Lkr.{getCartTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}
