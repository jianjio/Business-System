import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SalesOrder from "./pages/SalesOrder";
import Delivery from "./pages/Delivery";
import ARInvoice from "./pages/ARInvoice";
import PurchaseOrder from "./pages/PurchaseOrder";
import GoodsReceiptPO from "./pages/GoodsReceiptPO";
import APInvoice from "./pages/APInvoice";
import QuickApps from "./pages/QuickApps";
// import InventoryPage from "./components/InventoryForm"; // Adjusted import
import BPMaster from "./pages/BPMaster";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Tools from "./pages/Tools";
import UserManagement from "./pages/UserManagement";
import CreateUser from "./pages/CreateUser";
import OrderForm from "./pages/OrderForm";

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    setAuthToken(token); // Save token in state
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setAuthToken(null); // Clear token from state
  };

  useEffect(() => {
    const validateToken = async () => {
      if (authToken) {
        try {
          const response = await fetch(
            "https://fifpi-api.onrender.com/api/validate-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (!response.ok) {
            console.warn("Invalid token detected. Logging out.");
            handleLogout();
          }
        } catch (error) {
          console.error("Token validation error:", error.message);
          handleLogout();
        }
      }
    };

    validateToken();
  }, [authToken]);

  return (
    <Router>
      {authToken ? (
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar onLogout={handleLogout} />
          <div style={{ flexGrow: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/order-form" element={<OrderForm />} />
              <Route path="/sales-order" element={<SalesOrder />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/ar-invoice" element={<ARInvoice />} />
              <Route path="/purchase-order" element={<PurchaseOrder />} />
              <Route path="/goods-receipt-po" element={<GoodsReceiptPO />} />
              <Route path="/ap-invoice" element={<APInvoice />} />
              <Route path="/quick-apps" element={<QuickApps />} />
              {/* <Route
                path="/inventory"
                element={<InventoryPage authToken={authToken} />} // Pass authToken as a prop
              /> */}
              <Route path="/inventory" element={<Inventory />} />

              <Route path="/bp-master" element={<BPMaster />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
