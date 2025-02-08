import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();

  const toggleSubmenu = (menuIndex) => {
    setActiveSubmenu(activeSubmenu === menuIndex ? null : menuIndex);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://fifpi-api.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Success message
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to log out.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="min-w-64 bg-gray-200 p-4 h-dvh">
      <h3 className="text-lg font-bold mb-4">Menu</h3>
      <ul className="space-y-2 font-semibold">
        <li>
          <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>
        </li>
        <li>
          <div
            onClick={() => toggleSubmenu(2)}
            className="flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-200"
          >
            <span>Sales</span>
            <span>{activeSubmenu === 2 ? "▲" : "▼"}</span>
          </div>
          {activeSubmenu === 2 && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link
                  to="/order-form"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  Order Form
                </Link>
              </li>
              <li>
                <Link
                  to="/sales-order"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  Sales Order
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/ar-invoice"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  AR Invoice
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            onClick={() => toggleSubmenu(3)}
            className="flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-200"
          >
            <span>Purchasing</span>
            <span>{activeSubmenu === 3 ? "▲" : "▼"}</span>
          </div>
          {activeSubmenu === 3 && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link
                  to="/purchase-order"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  Purchase Order
                </Link>
              </li>
              <li>
                <Link
                  to="/goods-receipt-po"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  Goods Receipt PO
                </Link>
              </li>
              <li>
                <Link
                  to="/ap-invoice"
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  AP Invoice
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/quick-apps"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            Quick Apps
          </Link>
        </li>
        <li>
          <Link
            to="/inventory"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/bp-master"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            BP Master
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            Reports
          </Link>
        </li>
        <li>
          <Link
            to="/tools"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            Tools
          </Link>
        </li>
        <li>
          <Link
            to="/user-management"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            User Management
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className="block px-4 py-2 rounded text-red-600 cursor-pointer hover:bg-red-200"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
