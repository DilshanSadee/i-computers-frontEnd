import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../componentes/loader";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      const token =localStorage.getItem("token")

    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization : `Bearer ${token}`
          }
        } )
        .then((res) => {
          setOrders(res.data);
          setLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [loaded]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="w-full max-w-6xl bg-white/10 rounded-2xl shadow-2xl border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h1 className="text-2xl font-semibold text-amber-400 tracking-wide">
            Order Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">Admin dashboard view</p>
        </div>

        <div>
          {loaded ? (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gradient-to-r from-amber-500/20 to-transparent text-amber-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <td className="px-4 py-2 text-gray-300">{order.orderId}</td>

                    <td className="px-4 py-2 text-gray-100 font-medium">
                      {order.name}
                    </td>

                    <td className="px-4 py-2 text-gray-300">{order.email}</td>

                    <td className="px-4 py-2 text-gray-300">
                      {order.status}
                    </td>

                    <td className="px-4 py-2 text-amber-400">${order.total.toFixed(2)}</td>

                    <td className="px-4 py-2 text-gray-400">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-300">
                      action
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
