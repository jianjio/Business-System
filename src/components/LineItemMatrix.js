import React from "react";

function LineItemMatrix({ lineItems, setLineItems }) {
  const handleAddRow = () => {
    setLineItems([...lineItems, { itemCode: "", qty: 0, price: 0 }]);
  };

  const handleInputChange = (index, name, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][name] = value;
    setLineItems(updatedItems);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Line Items</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Item Code</th>
            <th className="border border-gray-300 px-4 py-2">Qty</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={item.itemCode}
                  onChange={(e) =>
                    handleInputChange(index, "itemCode", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-md"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-md"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleAddRow}
      >
        Add Row
      </button>
    </div>
  );
}

export default LineItemMatrix;
