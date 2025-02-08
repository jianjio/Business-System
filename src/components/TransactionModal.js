import React, { useState } from "react";
import LineItemMatrix from "./LineItemMatrix";

function TransactionModal({ transactionType, transaction, onClose, refresh }) {
  const [formData, setFormData] = useState(
    transaction || { customer: "", date: "", lineItems: [] }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const method = transaction ? "PUT" : "POST";
    const endpoint = transaction
      ? `https://fifpi-api.onrender.com/api/${transactionType}/${transaction.id}`
      : `https://fifpi-api.onrender.com/api/${transactionType}`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save transaction.");

      refresh();
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4">
        <h2 className="text-lg font-bold mb-4">
          {transaction ? "Edit" : "Add New"} {transactionType.toUpperCase()}
        </h2>
        <form className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleInputChange}
            placeholder="Customer"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </form>
        <LineItemMatrix
          lineItems={formData.lineItems}
          setLineItems={(lineItems) => setFormData({ ...formData, lineItems })}
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionModal;
