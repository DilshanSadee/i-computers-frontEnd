import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartTotal } from "../Utilis/cart";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state);
  if (location.state === null) {
    navigate("/products");

  }

function getCartTotal (){
    let total = 0;
    cart .forEach((item) => {
        total += item.price * item.quantity
    })
    return total;
}


  return (
    <div className="w-full flex flex-col items-center p-[20px]">
      {cart.map((item, index) => {
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
                    if(copiedCart [index].quantity < 1 ){
                        copiedCart.splice(index, 1)
                    }
                    setCart(copiedCart)
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
      <div className="w-[50%] h-[150px] shadow-2xl my-1  rounded flex justify-between items-center">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200">
          Place Your Order Now
        </button>

        <span className="pr-4 text-xl font-bold w-[150px] text-right ">
          Lkr.{getCartTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
}
