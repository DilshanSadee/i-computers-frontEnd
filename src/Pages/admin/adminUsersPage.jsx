
import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../componentes/loader";
import { GoVerified } from "react-icons/go";


export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded , setLoaded] = useState(false);

  useEffect(() => {
    if(!loaded){
          axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all",{
            headers : {
              Authorization : "Bearer " + localStorage.getItem("token",) 
            }
          }).then((response) => {
      console.log(response.data);
      setUsers(response.data);
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
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
                
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
                <tr
                  key={item.productID}
                  className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[40px] h-[40px] object-contain rounded-md border border-gray-600/40 shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-300 flex flex-row">{item.email}{item.isEmailVerified ? <GoVerified className="text-blue-400"/> : "" }

                  </td>
                  <td className="px-4 py-2 font-medium text-gray-100">{item.firstName}</td>
                  <td className="px-4 py-2 text-amber-400">{item.lastName}</td>
                  <td className="px-4 py-2 text-gray-300">{item.role}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {item.isblocked ? "blocked" : "active"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    <button className="px-3 py-1 bg-accent text-black rounded-lg hover:scale-105 hover:shadow-[0_4px_12px_-2px] active:scale-95 transition-all text-sm font-medium "
                    onClick={
                      async () => {
                        await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}` , {
                          isBlocked : !item.isBlocked
                        },
                        {
                          headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                          }
                        }
                       );
                       setLoaded(false)
                      }
                      
                    }>
                      {
                        item.isBlocked?"unblock user":"block User"
                      }
                    </button>
                  </td>

                  
                  
                </tr>
              ))}
            </tbody>
          </table>: <Loader/>}
        </div>
      </div>

     
    </div>
  );
}

