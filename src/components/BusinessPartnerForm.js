import React, { useState, useEffect } from "react";

function BusinessPartnerForm({ authToken, formMode, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    bpCode: "",
    bpName: "",
    foreignName: "",
    bpType: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    tin: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Populate form data for "Find/Update" mode
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        bpCode: "",
        bpName: "",
        foreignName: "",
        bpType: "",
        address: "",
        phone: "",
        email: "",
        contactPerson: "",
        tin: "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({});

    try {
      const response = await fetch(
        "https://fifpi-api.onrender.com/api/business-partners",
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
          bpCode: "",
          bpName: "",
          foreignName: "",
          bpType: "",
          address: "",
          phone: "",
          email: "",
          contactPerson: "",
          tin: "",
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
        {formMode === "Add"
          ? "Add New Business Partner"
          : "Update Business Partner"}
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
          name="bpCode"
          value={formData.bpCode}
          onChange={handleInputChange}
          placeholder="Business Partner Code"
          className="border border-gray-300 p-2 rounded-md"
          required
          readOnly={formMode === "Find/Update"}
        />
        <input
          type="text"
          name="bpName"
          value={formData.bpName}
          onChange={handleInputChange}
          placeholder="Business Partner Name"
          className="border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="foreignName"
          value={formData.foreignName}
          onChange={handleInputChange}
          placeholder="Foreign Name"
          className="border border-gray-300 p-2 rounded-md"
        />
        <select
          name="bpType"
          value={formData.bpType}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md"
          required
        >
          <option value="" disabled>
            Select Business Partner Type
          </option>
          <option value="Customer">Customer</option>
          <option value="Vendor">Vendor</option>
          <option value="Lead">Lead</option>
        </select>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="border border-gray-300 p-2 rounded-md"
          required
        ></textarea>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleInputChange}
          placeholder="Contact Person"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          name="tin"
          value={formData.tin}
          onChange={handleInputChange}
          placeholder="Tax Identification Number (TIN)"
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {formMode === "Add"
            ? "Add Business Partner"
            : "Update Business Partner"}
        </button>
      </form>
    </div>
  );
}

export default BusinessPartnerForm;
