import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    client: "",
    designer: "",
    address: "",
    contactPerson: "",
    receiverNo: "",
    orderNo: "",
    additionalField1: "",
    additionalField2: ""
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
      <div className="bg-white w-full shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 uppercase">Order Details</h2>
      <div className="grid grid-cols-3 gap-6">
        <div>
            <div className="grid grid-cols-1">
              <label className="font-medium ml-2">Date:</label>
              <input
                type="date"
                name=""
                placeholder=""
                className="border p-2 w-2/3 rounded-md shadow-lg"
                required
                
              />

              <label className="font-medium ml-2 mt-4">Client:</label>
              <input
                type="text"
                name=""
                className="border p-2 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium ml-2 mt-4">Designer:</label>
              <input
                type="text"
                name=""
                className="border p-2 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium ml-2 mt-4">Address:</label>
              <textarea
                type="text"
                name=""
                className="border p-2 rounded w-2/3 shadow-lg"
              />

              
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 ml-5">
              <label className="font-medium ml-2">Contact Person:</label>
              <input
                type="text"
                name=""
                placeholder=""
                className="border p-2 w-2/3 rounded-md shadow-lg"
                
                
              />

              <label className="font-medium ml-2 mt-4">Receiver's No.:</label>
              <input
                type="text"
                name=""
                className="border p-2 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium ml-2 mt-4">Order No.:</label>
              <input
                type="text"
                name=""
                className="border p-2 rounded w-2/3 shadow-lg"
              />

              
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 ">Amount</h3>
            <div className="grid grid-cols-2 gap-5">
              <label className="font-medium">SubTotal:</label>
              <input
                type="text"
                name="subTotal"
                placeholder=""
                className="border p-1 w-2/3 rounded-md shadow-lg"
                
                
              />

              <label className="font-medium">Discount %:</label>
              <input
                type="text"
                name=""
                className="border p-1 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium">Discount Total:</label>
              <input
                type="text"
                name=""
                className="border p-1 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium">Taxable Total:</label>
              <input
                type="text"
                name="client"
                className="border p-1 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium">Tax Total:</label>
              <input
                type="text"
                name=""
                className="border p-1 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium">Net Total:</label>
              <input
                name=""
                className="border p-1 rounded w-2/3 shadow-lg"
              />

              <label className="font-medium">Remaining Credit Limit:</label>
              <input
                type="text"
                name="discount"
                placeholder=""
                className="border p-2 w-2/3 mb-2 rounded-md shadow-lg"
                
              
              />
            </div>
          </div>
        </div>
        </div>
      

      <div className="w-full p-6 bg-white shadow-lg rounded-lg mt-6">
        <table className="w-full border-collapse border border-gray-400 text-xs">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 py-1">
                PHOTO REFERENCE
              </th>
              <th className="border border-gray-400 px-2 py-1">Material</th>
              <th className="border border-gray-400 px-2 py-1">DESCRIPTION</th>
              <th className="border border-gray-400 px-2 py-1">On-hand</th>
              <th className="border border-gray-400 px-14 py-1">Type</th>
              <th className="border border-gray-400 px-auto py-1">Qty</th>
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
                        <option value="">None</option>
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
        <div className="mt-4 flex justify-between">
          <div className="flex space-x-4">
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
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800" 
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
