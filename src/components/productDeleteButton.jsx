import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {
  const productID = props.productID;
 const reload = props.reload;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMassageOpen, setIsMassageOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
     const token = localStorage.getItem("token")
                      axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID , {
                        headers :{
                          Authorization: `Bearer ${token}`
                        }
                      }).then(

                        ()=>{
                          toast.success("product successfully deleted")
                          setIsDeleting(false)
                          setIsMassageOpen(false)
                          reload()
                        }).catch(()=>{
                            toast.error("failed to delete product");
                            setIsDeleting(false);
                        })
  }

  return (
    <>
      <button
        onClick={() => setIsMassageOpen(true)}
        className="bg-red-600 w-[60px] h-[40px] text-white px-4 py-4 hover:bg-red-800 flex items-center justify-center rounded "
      >
        Delete
      </button>
      {isMassageOpen && (
        <div className="w-[100vw] h-screen fixed inset-0 z-[99999] bg-black/55  top-0 left-0 flex justify-center items-center">
          <div className="w-[300px] h-[300px] bg-white rounded-2xl relative flex flex-col justify-center items-center ">
            <button
              onClick={() => setIsMassageOpen(false)}
              className="w-[30px] h-[30px] bg-red-600 rounded-full text-white font-bold cursor-pointer hover:bg-red-800 absolute right-[-25px] top-[-17px] "
            >
              X
            </button>
            <h1 className="text-black text-center">
              Are You Sure You want delete Product {productID} ?
            </h1>
            <div className="flex items-center justify-center gap-10 p-[20px] ">
              <button
                disabled = {isDeleting}
                onClick={handleDelete}
                className="bg-red-600 w-[60px] h-[30px]   text-white px-4 py-4 hover:bg-red-800 flex items-center justify-center rounded"
              >
                {" "}
                delete
              </button>
              <button className="bg-blue-400 w-[60px] h-[30px]  text-black px-4 py-4 hover:bg-blue-300 flex items-center justify-center rounded">
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// //<button onClick={
//                       ()=>{
//                        
//                       )}
//                       } className="w-[80px] h-[30px] bg-red-500 justify-center items-center rounded-2xl text-white cursor-pointer hover:bg-red-800">Delete</button>
