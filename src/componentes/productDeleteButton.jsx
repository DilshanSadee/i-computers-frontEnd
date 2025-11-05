export default function ProductDeleteButton(props){
   const productID 
   
    return(

        
        <button className="bg-red-600 w-[60px] h-[30px] text-white px-4 py-4 hover:bg-red-800 flex items-center justify-center rounded ">
          
        </button>
    )
}

// //<button onClick={ 
//                       ()=>{
//                         const token = localStorage.getItem("token")
//                       axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + item.productID , {
//                         headers :{
//                           Authorization: `Bearer ${token}`
//                         }
//                       }).then(
                        
//                         ()=>{
//                           toast.success("product successfully deleted")
//                           setloaded(false)
//                         }
//                       )}
//                       } className="w-[80px] h-[30px] bg-red-500 justify-center items-center rounded-2xl text-white cursor-pointer hover:bg-red-800">Delete</button>