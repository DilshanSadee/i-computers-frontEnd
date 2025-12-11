import { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";
import ProductCard from "./productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col">
      {!loaded ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-wrap lg:flex-row  justify-center gap-4 ">
          <div className="w-full h-[100px] bg-white/50 sticky top-0  flex justify-center items-center mb-4 shadow-md z-10  ">
            <input
              type="text"
              placeholder="Search Products...."
              className="w-1/2 px-4 border border-secondary/30 rounded-lg outline-none"
              onChange={async (e) => {
                if (e.target.value == "") {
                  setLoaded(false);
                  await axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/products")
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                      setLoaded(true);
                    });
                  setLoaded(true);
                } else {
                  await axios
                    .get(
                      import.meta.env.VITE_BACKEND_URL +
                        "/products/search/" +
                        e.target.value
                    )
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                    });
                  setLoaded(true);
                }
              }}
            />
          </div>

          {products?.map((item) => (
            <ProductCard key={item.productID} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
