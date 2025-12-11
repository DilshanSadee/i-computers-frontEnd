import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewCustomerInfo({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  Modal.setAppElement("#root");
  return (
    <>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Details - {order.orderId}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Customer Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Customer Info
            </h3>
            <p>
              <span className="font-medium">Name:</span> {order.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {order.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-medium">Order Date:</span>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
            {/* Status Badge */}
            <div className="mt-2 flex gap-4">
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
      ${
        order.status === "pending"
          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
          : order.status === "completed"
          ? "bg-green-100 text-green-800 border border-green-300"
          : order.status === "cancelled"
          ? "bg-red-100 text-red-800 border border-red-300"
          : "bg-gray-100 text-gray-800 border border-gray-300"
      }
    `}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div>
                <select
                  //value={status}
                  disabled
                  className="ml-4 px-2 py-1 border-secondary rounded text-md outline-none "
                >
                  <option value="pending">Pending</option>
                  <option value="process">Process</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delete">Delete</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total and Notes */}
          <div className="mt-4 border-t pt-4">
            {/* Total */}
            <p className="font-semibold text-lg">
              Total:
              <span className="text-accent ml-1">${order.total}</span>
            </p>

            {/* Notes Textarea */}

            <div className="mt-3">
              <label className="font-medium text-gray-700">Notes:</label>
              <textarea
                className="w-full mt-1 p-2 border rounded text-gray-700 bg-white"
                value={order.notes || " no additional notes" }
                disabled
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* View Order Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          toast.success(`Viewing Order ${order.orderId}`);
        }}
        className="bg-accent/70 hover:bg-accent p-2 rounded-lg text-white cursor-pointer"
      >
        View Order
      </button>
    </>
  );
}
