import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div className="  w-[300px] h-[300px]  m-4 rounded-2xl shadow-2xl  p-4 flex flex-col  text-center cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0 overflow-x-hidden ">
      <div className=" w-[400px] h-[300px] lg:w-full lg:h-full  relative  ">
        <img
          src={product.images[1]}
          className="w-full h-full absolute b "
        />
        <img
          src={product.images[0]}
          className="w-full h-full absolute  primary-image hover:opacity-0 transition-opacity duration-500 object-cover "
        />
      </div>
      <div className="w-full h-[100px] p-2 justify-evenly  ">
        <h1 className="text-center text-lg">{product.name}</h1>
        <div className="w-full flex flex-col items-center ">
          {product.labeledPrice > product.price && (
            <h2 className="text-secondary line-through decoration-gold/70 decoration-2 mr-2">
              LKR.{product.labeledPrice.toFixed(2)}
            </h2>
          )}
          <h2 className="text-accent font-semibold text-2xl ">
            lkr.{product.price}
          </h2>
        </div>
      </div>
      <div className=" w-full h-[115px] bottom-0 bg-white flex  gap-4 justify-center items-center opacity-0 transition-opacity duration-300  absolute buttons overflow-x-hidden ">
        <Link to={"/overview/" + product.productID} className="border-2 h-[50px] w-[150px] border-accent text-accent hover:bg-accent hover:text-black transition-colors duration-300 flex justify-center items-center ">
          Buy item
        </Link>

      </div>
    </div>
  );
}
