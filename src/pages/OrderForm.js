import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    date: "Tuesday, June 4, 2024",
    client: "Leonardo Paulino",
    designer: "Voltaire Villareal",
    address: "Gate Celebrity Place Diliman",
    contactPerson: "Leonardo Paulino",
    receiverNo: "0916-497-5199",
    orderNo: "3411",
  });

  const [rows, setRows] = useState([
    {
      photo: "",
      material: "",
      description: "",
      onHand: "",
      type: "",
      qty: "",
      unitPrice: "",
      tax: "",
      discountPrice: "",
      total: "",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        photo: "",
        material: "",
        description: "",
        onHand: "",
        type: "",
        qty: "",
        unitPrice: "",
        tax: "",
        discountPrice: "",
        total: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const clearRows = () => {
    setRows([]);
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 border-collapse shadow-lg rounded p-6 overflow-auto">
      <div className="max-w-6xl table-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Order Details</h2>
        <div className="grid grid-cols-2 gap-12 border-b pb-4">
          <div className="grid grid-cols-2 gap-6">
            <label className="font-semibold">Date:</label>
            <textarea
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-semibold">Client:</label>
            <textarea
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-semibold">Designer:</label>
            <textarea
              name="designer"
              value={formData.designer}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-semibold">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <label className="font-semibold">Contact Person:</label>
            <textarea
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-semibold">Receiver's No:</label>
            <textarea
              name="receiverNo"
              value={formData.receiverNo}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <label className="font-semibold">Order No:</label>
            <textarea
              name="orderNo"
              value={formData.orderNo}
              onChange={handleChange}
              className="border p-2 rounded w-full font-bold"
            />
          </div>
        </div>
      </div>

      <div className="w-full p-6 bg-white shadow-lg rounded-lg mt-6">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 py-1">
                PHOTO REFERENCE
              </th>
              <th className="border border-gray-400 px-2 py-1">Material</th>
              <th className="border border-gray-400 px-2 py-1">DESCRIPTION</th>
              <th className="border border-gray-400 px-2 py-1">On-hand</th>
              <th className="border border-gray-400 px-3 py-1">Type</th>
              <th className="border border-gray-400 px-2 py-1">Qty</th>
              <th className="border border-gray-400 px-2 py-1">Unit Price</th>
              <th className="border border-gray-400 px-2 py-1">Tax</th>
              <th className="border border-gray-400 px-2 py-1">
                Discount Price
              </th>
              <th className="border border-gray-400 px-2 py-1">Total</th>
              <th className="border border-gray-400 px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td key={key} className="border border-gray-400 px-2 py-1">
                    {key === "type" ? (
                      <select
                        name={key}
                        value={row[key]}
                        onChange={(e) => handleRowChange(index, e)}
                        className="border p-1 rounded w-full"
                      >
                        <option value=""></option>
                        <option value="Type 1">For Production</option>
                        <option value="Type 2">Stock</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={row[key]}
                        onChange={(e) => handleRowChange(index, e)}
                        className="border p-1 rounded w-full"
                      />
                    )}
                  </td>
                ))}
                <td className="border border-gray-400 px-2 py-1">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Row
          </button>
          <button
            onClick={clearRows}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear All Rows
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
