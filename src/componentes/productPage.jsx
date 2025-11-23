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
        <div className="w-full flex flex-wrap lg:flex-row  justify-center gap-4">
          {products?.map((item) => (
            <ProductCard key={item.productID} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
