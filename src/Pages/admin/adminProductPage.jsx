import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton"


export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded , setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!loaded){
          axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
      setLoaded(true)
    });
    }
 
  }, [loaded]);

  return (
    <div className="w-screen h-full flex flex-col items-center justify-start p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 overflow-y-scroll">
      <div className="w-full max-w-6xl  bg-white/10 rounded-2xl shadow-2xl  border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h1 className="text-2xl font-semibold text-amber-400 tracking-wide">Product Management</h1>
          <p className="text-sm text-gray-400 mt-1">Admin dashboard view</p>
        </div>

        <div className="overflow-x-scroll">
         {loaded ?<table className="w-full text-sm text-left border-collapse ">
            <thead className="bg-gradient-to-r from-amber-500/20 to-transparent text-amber-300 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Labeled Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                  key={item.productID}
                  className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-[40px] h-[40px] object-contain rounded-md border border-gray-600/40 shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-300">{item.productID}</td>
                  <td className="px-4 py-2 font-medium text-gray-100">{item.name}</td>
                  <td className="px-4 py-2 text-amber-400">${item.price}</td>
                  <td className="px-4 py-2 text-gray-300">${item.labeledPrice}</td>
                  <td className="px-4 py-2 text-gray-300">{item.category}</td>
                  <td className="px-4 py-2 text-gray-300">{item.brand}</td>
                  <td className="px-4 py-2 text-gray-300">{item.model}</td>
                  <td className="px-4 py-2 text-gray-300">{item.stock}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      item.isAvailable ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Out of Stock"}
                  </td>
                  <td className="px-4 py-2 text-gray-400 inline-flex gap-2">
                    <Link className=" px-2 py-2 w-[50px] bg-accent rounded text-center"
                    to="/admin/update-product"
                    state={item}>Edit</Link> 
                    <ProductDeleteButton productID = {item.productID} reload={()=>{setLoaded(false)}}/>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>: <Loader/>}
        </div>
      </div>

      <Link
        to="/admin/add-product"
        className="fixed right-6 bottom-6 w-[60px] h-[60px] flex justify-center items-center text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border border-amber-400/50 rounded-full shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}

