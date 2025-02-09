import React, { useState, useEffect, useCallback } from "react";
import BusinessPartnerForm from "./BusinessPartnerForm";
import BusinessPartnerList from "./BusinessPartnerList";

function BusinessPartnerPage({ authToken }) {
  const [formMode, setFormMode] = useState("Add");
  const [selectedBP, setSelectedBP] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [refreshList, setRefreshList] = useState(false);

  const handleAdd = () => {
    setSelectedBP(null);
    setFormMode("Add");
  };

  const handleEdit = (bp) => {
    setSelectedBP(bp);
    setFormMode("Update");
  };

  const handleSuccess = () => {
    setRefreshList(!refreshList); // Trigger refresh for the list
    setSelectedBP(null);
    setFormMode("Add");
    setMessage({ type: "success", text: "Operation successful!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-gray-200 rounded-lg shadow-md">
      {/* Left Side: Form */}
      <div className="col-span-1 bg-gray-200 p-4 rounded-md">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-md ${
              formMode === "Add" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Add Business Partner
          </button>
          <button
            onClick={() => setFormMode("Find/Update")}
            className={`px-4 py-2 rounded-md ${
              formMode === "Find/Update"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Find/Update
          </button>
        </div>

        <BusinessPartnerForm
          authToken={authToken}
          formMode={formMode}
          initialData={selectedBP}
          onSuccess={handleSuccess}
        />

        {message.text && (
          <p
            className={`mt-4 ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {/* Right Side: List */}
      <div className="col-span-2 p-4 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">Business Partners</h2>
        <BusinessPartnerList
          authToken={authToken}
          onEdit={handleEdit}
          refresh={refreshList}
        />
      </div>
    </div>
  );
}

export default BusinessPartnerPage;
