import React, { useState, useEffect } from "react";

function BusinessPartnerList({ authToken, onEdit, refresh }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://fifpi-api.onrender.com/api/business-partners",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch business partners.");
        const data = await response.json();
        console.log("Fetched Business Partners:", data.items); // Debug
        setPartners(data.items || []);
      } catch (error) {
        console.error("Error fetching business partners:", error.message);
      }
      setLoading(false);
    };

    fetchPartners();
  }, [authToken, refresh]);

  return (
    <div className="overflow-auto max-h-screen">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">BP Code</th>
            <th className="border border-gray-300 px-4 py-2">BP Name</th>
            <th className="border border-gray-300 px-4 py-2">Foreign Name</th>
            <th className="border border-gray-300 px-4 py-2">BP Type</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Emai</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((item) => (
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

export default BusinessPartnerList;