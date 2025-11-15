import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../componentes/loader";
import toast from "react-hot-toast";
import ImageSlider from "../componentes/imageSlider";
import { BiChevronRight } from "react-icons/bi";
import { addToCart, } from "../Utilis/cart";

export default function ProductOverView() {
  const navigate = useNavigate()
  const params = useParams();
  const [product, setProduct] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status == "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
        .then((response) => {
          setProduct(response.data);
          setStatus("success");
        })
        .catch(() => {
          toast.error("Product Not Found");
          setStatus("error");
        });
    }
  }, []);

  return (
    <>
      {status == "loading" && <Loader />}
      {status == "error" && (
        <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
      )}
      {status == "success" && (
        <div className="w-full h-[calc(100vh-100px)] flex  ">
          <div className="w-1/2 h-full flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-1/2 h-full p-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <h2 className="">{product.productID}</h2>
            <h3 className="flex">
              <BiChevronRight /> {product.category}
            </h3>
            <p className="text-md text-justify text-secondary h-10  overflow-y-auto">
              {product.description}
            </p>
            <div className=" w-full">
              {product.labeledPrice > product.price && (
                <h2 className="text-secondary line-through decoration-2 mr-2 text-xl">
                  lkr.{product.labeledPrice.toFixed(2)}
                </h2>
              )}
              <h2 className="text-secondary   decoration-2 mr-2 text-xl">
                lkr.{product.price.toFixed(2)}
              </h2>
            </div>
            <div className="flex gap-5 items-center j">
            <button onClick={ ()=>
                addToCart(product, 1)
            } className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
            {<button onClick={
              ()=>{
                navigate ("/checkout",{state:[{
                  productID : product.productID,
                  name : product.name,
                  price : product.price,
                  labeledPrice :product.labeledPrice,
                  image : product.images[0],
                  quantity : 1

                }] })
                
              }
            } className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
              Buy Now
            </button> }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
