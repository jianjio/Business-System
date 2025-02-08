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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>BP Code</th>
              <th>BP Name</th>
              <th>Foreign Name</th>
              <th>BP Type</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners && partners.length > 0 ? (
              partners.map((partner) => (
                <tr key={partner.bpCode}>
                  <td>{partner.bpCode}</td>
                  <td>{partner.bpName}</td>
                  <td>{partner.foreignName}</td>
                  <td>{partner.bpType}</td>
                  <td>{partner.phone}</td>
                  <td>{partner.email}</td>
                  <td>
                    <button onClick={() => onEdit(partner)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No business partners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BusinessPartnerList;
