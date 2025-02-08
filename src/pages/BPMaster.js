import React from "react";
import BusinessPartnerPage from "../components/BusinessPartnerPage"; // Adjust path if necessary

function BPMaster() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">
        Business Partner Management
      </h1>
      <BusinessPartnerPage authToken={localStorage.getItem("authToken")} />
    </div>
  );
}

export default BPMaster;
