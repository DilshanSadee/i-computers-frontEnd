import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../../Utilis/mediaUploads";

export default function AdminAddProductpage() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [labeledPrice, setLabeledPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setstock] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate()

  async function addProduct() {
    
    const token = localStorage.getItem("token")
    if (token == null){
      toast.error("you must be loging as a an admin")
      navigate("/login");
      return
    }
    console.log(files);
    const imagePromises = []

    for (let i=0; i<files.length; i++ ){
      console.log(files[i]);
      const promise = uploadFile(files[i])
     imagePromises.push(promise)
      
    }

    const images = await Promise.all(imagePromises).catch((err)=>{
      toast.error ("error uploading images,pleazse try again");
      console.log("error uploading images");
      console.log(err);
      return
      
     })

    if (productID== ""|| name== ""|| altName== ""|| description== ""){
      toast.error("you must be full fill all ");
      navigate("/login");
      return
    }

    try {
        const altNameArray =altName.split(",")

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/products/",{
        productID : productID,
        name : name,
        altName : altNameArray,
        description : description,
        price : price,
        labeledPrice : labeledPrice,
        images : images,
        category : category,
        brand : brand,
        model :model,
        stock : stock,
        isAvailable : isAvailable 

      },{
        headers :{
          authorization : "Bearer "+ token
        }
      })
      toast.success("product added successfully")
      navigate("/admin/products")

    } catch (err) {
        toast.error ("error adding product ,please try again");
        console.log(("error adding  product"));
        console.log(err);
        
        
      
    }
    
  }

  return (
    <div className="w-full flex justify-center items-center p-[50px] overflow-y-scroll">
      <div className="w-[800px] h-full p-[40px] bg-accent rounded-2xl ">
        <div className="w-full  bg-amber-50 flex flex-row flex-wrap justify-between p-[20px] rounded-2xl">
          <div className="my-[10px] w-[40%]">
            <label>Product ID</label>
            <input
              type="text"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl p-[20px]"
            />
            <span className="text-gray-500 text-sm block w-full text-right ">
              provide a unique name
            </span>
          </div>
          <div className="my-[10px] w-[50%]">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px] w-full">
            <label>Alternative Names</label>
            <input
              type="text"
              value={altName}
              onChange={(e) => setAltName(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
            <span className="block text-sm w-full text-right text-gray-500">
              separate multiple name with commas
            </span>
          </div>
          <div className="my-[10px] w-full">
            <label>Discription</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[60px] rounded-2xl px-[20px] border shadow-2xl py-[10px]"
            />
            <span className="block text-sm w-full text-right text-gray-500">
              separate multiple name with commas
            </span>
          </div>
          <div className="my-[10px] w-[40%]">
            <label>price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px] w-[40%]">
            <label>Labeld price</label>
            <input
              type="number"
              value={labeledPrice}
              onChange={(e) => setLabeledPrice(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px] w-full">
            <label>Images</label>
            <input
              type="file"
              multiple = {true}
              onChange={(e) => {
                setFiles(e.target.files)
              }}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px] w-[30%]">
            <label>Catagory </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xll"
            >
              <option value="CPU">CPU</option>
              <option value="grapic cards">grapic cards</option>
              <option value="mother board">Mother Board</option>
              <option value="mouse and keyboard">Mouse and keyboard</option>
              <option value="moniters">moniters</option>
              <option value="Pc">Pc</option>
              <option value="Computers">Computers</option>
              <option value="Laptop ">Laptop</option>
              <option value="Cables">Cables</option>
              <option values="others">others</option>
            </select>
          </div>
          <div className="my-[10px] w-[30%]">
            <label>model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px] w-[30%]">
            <label>brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px]">
            <label>stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setstock(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            />
          </div>
          <div className="my-[10px]">
            <label>avalable</label>
            <select
              type="text"
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value)}
              className="w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <Link to="/admin/Products" className="p-[5px] w-full h-[40px] rounded-2xl px-[20px] border shadow-2xl text-center my-[20px] hover:bg-red-500">Cancel</Link>
          <button onClick={addProduct} className="w-full h-[40px] bg-accent hover:bg-transparent rounded-2xl px-[20px] border shadow-2xl">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
