// salesorder.js
import React, { useState, useEffect } from "react";
import TransactionModal from "../components/TransactionModal";

function SalesOrder({ authToken }) {
  const [salesOrders, setSalesOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch sales orders
  const fetchSalesOrders = async () => {
    try {
      const response = await fetch(
        "https://fifpi-api.onrender.com/api/sales-orders",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch sales orders.");

      const data = await response.json();
      setSalesOrders(data.items || []);
    } catch (error) {
      console.error("Error fetching sales orders:", error.message);
    }
  };

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const handleAddNew = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sales Orders</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleAddNew}
      >
        Add New Sales Order
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.customer}
              </td>
              <td className="border border-gray-300 px-4 py-2">{order.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.totalAmount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <TransactionModal
          transactionType="sales-orders"
          transaction={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          refresh={fetchSalesOrders}
        />
      )}
    </div>
  );
}

export default SalesOrder;
