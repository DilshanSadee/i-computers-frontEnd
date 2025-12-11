import { Link, Route, Routes } from "react-router-dom";
import { BsBoxSeam, BsCardList } from "react-icons/bs";
import { FiUserMinus } from "react-icons/fi";
import { MdReviews } from "react-icons/md";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductpage from "./admin/adminAddProductPage";
import AdminUpdateProductpage from "./admin/adminupdateProductPage";
import AdminOrderPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "/";
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data?.role == "admin") {
          setUser(response.data);
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);
  return (
    <div className="w-full h-full bg-primary flex ">
        {user ?(
      <>
        <div className="w-[300px] h-full bg-primary border-white">
          <div className="w- h-[100px] bg-amber-200 flex items-center font-bold border-2">
            <img src="/logo.png" className="h-full" />
            <h1>Admin Pannel</h1>
          </div>
          <div className="w-full h-[400px] text-black flex flex-col text-2xl pl-[20px] ">
            <Link
              to="/admin"
              className="w-full flex items-center h-[50px] gap-[10px]"
            >
              <BsCardList /> Orders
            </Link>

            <Link
              to="/admin/products"
              className="w-full flex items-center h-[50px] gap-[10px]"
            >
              <BsBoxSeam /> Products
            </Link>

            <Link
              to="/admin/users"
              className="w-full flex items-center h-[50px] gap-[10px]"
            >
              <FiUserMinus /> Users
            </Link>

            <Link
              to="/admin/reviews"
              className="w-full flex items-center h-[50px] gap-[10px]"
            >
              <MdReviews /> Reviews
            </Link>
          </div>
        </div>
        <div className="w-[calc(100%-300px)] h-full max-h-full ">
          <div className="w-full h-full max-h-full overflow-y-scroll border-[10px] border-accent rounded-2xl pl-[20px] ">
            <Routes>
              <Route path="/" element={<AdminOrderPage />}></Route>
              <Route path="/products" element={<AdminProductPage />}></Route>
              <Route
                path="/add-Product"
                element={<AdminAddProductpage />}
              ></Route>
              <Route path="/users" element={<AdminUsersPage/>}></Route>
              <Route path="/reviews" element={<h1>reviews</h1>}></Route>
              <Route
                path="/update-Product"
                element={<AdminUpdateProductpage />}
              ></Route>
            </Routes>
          </div>
        </div>
      </>
        ):(
      <Loader />
)}
    </div>
  );
}
