import React from "react";
import InventoryPage from "../components/InventoryPage"; // Ensure the path to InventoryPage is correct

function Inventory() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">
        Inventory Management
      </h1>
      <InventoryPage authToken={localStorage.getItem("authToken")} />
    </div>
  );
}

export default Inventory;
