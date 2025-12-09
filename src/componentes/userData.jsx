import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setuser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setuser(response.data);
        })
        .catch(() => {
          setuser(null);
        });
    } else {
      setuser(null);
    }
  }, []);

  const [selectedOption, setSelectedOption] = useState("user");

  return (
    <>
      {user ? (
        <div className="w-[150px] flex flex-row  ">
          <img src={user.image} referrerPolicy="no-referrer" className="w-[40px] h-[40px] rounded-full " />
          <select
            className="bg-transparent outline-none ml-2 mt-2"
            value={selectedOption}
            onChange={(e) => {
              if (e.target.value == "logout") {
                localStorage.removeItem("token");
                window.location.href = "/";
              } else if(e.target.value == "my-orders") {
                window.location.href = "/orders";
              }

              setSelectedOption("user");
            }}
          >
            <option value={"user"}>{user.firstName} </option>
            <option value={"logout"}>Logout</option>
            <option value={"my-orders"}>my order</option>
          </select>
        </div>
      ) : (
        <div>
          <Link to="/login" className="mx-2  px-4 py-2 bg-white text-black rounded-full">
            login
          </Link>
          <Link to="/register" className="mx-2 px-4 py-2 bg-white text-black rounded-full ">
            Register
          </Link>
        </div>
      )}
    </>
  );
}
