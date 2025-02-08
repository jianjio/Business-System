// InventoryList.js
import React from "react";

function InventoryList({ items, onEdit }) {
  return (
    <div className="overflow-auto max-h-screen">
      <h2 className="text-xl font-bold mb-4">Inventory Items</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Item Code</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Group</th>
            <th className="border border-gray-300 px-4 py-2">UOM</th>
            <th className="border border-gray-300 px-4 py-2">Unit Price</th>
            <th className="border border-gray-300 px-4 py-2">Last Purchase</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemCode}>
              <td className="border border-gray-300 px-4 py-2">
                {item.itemCode}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.itemDescription}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.itemGroup}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.unitOfMeasurement}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.unitPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.lastPurchasePrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
