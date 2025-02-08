import React, { useState, useEffect } from "react";

function InventoryForm({ authToken, formMode, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemDescription: "",
    itemGroup: "FG", // Default value
    unitOfMeasurement: "",
    unitPrice: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Populate form data for Find/Update mode
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        itemCode: "",
        itemDescription: "",
        itemGroup: "FG",
        unitOfMeasurement: "",
        unitPrice: "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate unitPrice input
    if (name === "unitPrice") {
      const numericValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers and a single dot
      if (
        numericValue === "" ||
        /^[0-9]{1,8}(\.[0-9]{0,2})?$/.test(numericValue)
      ) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({});

    try {
      const response = await fetch(
        "https://fifpi-api.onrender.com/api/inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ ...formData, formMode }),
        }
      );

      if (!response.ok) {
        throw new Error("Error saving data.");
      }

      const data = await response.json();
      setMessage({ type: "success", text: data.message });

      if (formMode === "Add") {
        setFormData({
          itemCode: "",
          itemDescription: "",
          itemGroup: "FG",
          unitOfMeasurement: "",
          unitPrice: "",
        });
        onSuccess();
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {formMode === "Add" ? "Add New Item" : "Update Item"}
      </h2>

      {message.text && (
        <p
          className={`mb-4 ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="itemCode"
          value={formData.itemCode}
          onChange={handleInputChange}
          placeholder="Item Code"
          className="border border-gray-300 p-2 rounded-md"
          required
          readOnly={formMode === "Update"}
        />
        <input
          type="text"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleInputChange}
          placeholder="Item Description"
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <select
          name="itemGroup"
          value={formData.itemGroup}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md"
          required
        >
          <option value="FG">FG (Finished Goods)</option>
          <option value="RM">RM (Raw Materials)</option>
        </select>
        <input
          type="text"
          name="unitOfMeasurement"
          value={formData.unitOfMeasurement}
          onChange={handleInputChange}
          placeholder="Unit of Measurement"
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleInputChange}
          placeholder="Unit Price (e.g., 100.00)"
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {formMode === "Add" ? "Add Item" : "Update Item"}
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;
