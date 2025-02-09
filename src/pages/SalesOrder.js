import { useState } from "react";

export default function SalesOrder() {
  const [formData, setFormData] = useState({
    customerID: "",
    customerName: "",
    postingDate: "2025-02-08",
    documentDate: "2025-02-08",
    deliveryDate: "",
    docStatus: "Open",
    currency: "",
    salesperson: "",
    owner: "",
    customerReference: "",
    headerNote: "",
    bpNotes: "",
    termsOfPayment: "",
    subTotal: 0,
    discount: 0,
    discountTotal: 0,
    taxableTotal: 0,
    taxTotal: 0,
    netTotal: 0,
    remainingCreditLimit: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const tabs = [
    "Content",
    "Logistics",
    "User Defined Fields",
    "Notes",
    "Accounting",
    "Attachments",
  ];
  const [activeTab, setActiveTab] = useState("Content");

  return (
    <div className="flex flex-col items-center bg-gray-200 border-collapse shadow-lg rounded p-6 overflow-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4 ml-10">
          <h2 className="text-xl font-semibold">Sales Order - Create</h2>
          <div>
            <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md">
              Discard
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 ml-10">
          <div>
            <h3 className="font-semibold mb-4">General Information</h3>
            <input
              type="text"
              name="customerID"
              placeholder="Customer ID"
              className="border p-2 w-64 mb-4 rounded-md"
              onChange={handleChange}
            />
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              className="border p-2 w-64  mb-4 rounded-md"
              onChange={handleChange}
            />
            <input
              type="date"
              name="postingDate"
              className="border p-2 w-64  mb-4 rounded-md"
              value={formData.postingDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="documentDate"
              className="border p-2 w-64  mb-4 rounded-md"
              value={formData.documentDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="deliveryDate"
              className="border p-2 w-64  mb-4 rounded-md"
              onChange={handleChange}
            />
            <select
              name="docStatus"
              className="border p-2 w-64  mb-4 rounded-md"
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Terms and Conditions</h3>
            <input
              type="text"
              name="termsOfPayment"
              placeholder="Terms of Payment"
              className="border p-2 w-64  mb-4 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="ml-10">
            <h3 className="font-semibold mb-4 ">Amount</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="font-semibold">SubTotal:</label>
              <input
                type="text"
                name="subTotal"
                placeholder="Subtotal"
                className="border p-2 w-64 mb-2 rounded-md"
                disabled
                value={formData.subTotal}
              />

              <label className="font-semibold">Discount %:</label>
              <input
                type="text"
                name=""
                // value={formData.additionalField2}
                // onChange={handleChange}
                className="border p-2 rounded w-64"
              />

              <label className="font-semibold">Discount Total:</label>
              <input
                type="text"
                name=""
                // value={formData.date}
                // onChange={handleChange}
                className="border p-2 rounded w-64"
              />

              <label className="font-semibold">Taxable Total:</label>
              <input
                type="text"
                name="client"
                // value={formData.client}
                // onChange={handleChange}
                className="border p-2 rounded w-64"
              />

              <label className="font-semibold">Tax Total:</label>
              <input
                type="text"
                name=""
                // value={formData.designer}
                // onChange={handleChange}
                className="border p-2 rounded w-64"
              />

              <label className="font-semibold">Net Total:</label>
              <input
                name=""
                // value={formData.address}
                // onChange={handleChange}
                className="border p-2 rounded w-64"
              />

              <label className="font-semibold">Remaining Credit Limit:</label>
              <input
                type="text"
                name="discount"
                placeholder="Discount %"
                className="border p-2 w-64 mb-2 rounded-md"
                disabled
                value={formData.discount}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-full table-auto p-6 bg-gray-200 shadow-lg rounded-lg">
          <h3 className="font-semibold mb-4 ml-5">Add Items</h3>
          <div className="border p-4 rounded-lg bg-gray-100 text-xs">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search items..."
                className="border p-2 flex w-1/3 rounded-md"
              />
              <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
                Add to PO
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
                Display Order
              </button>
            </div>
            <table className=" w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Item Code</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">QOH</th>
                  <th className="border p-2">QOO</th>
                  <th className="border p-2">QCT</th>
                  <th className="border p-2">UOM</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Last Sold Price</th>
                  <th className="border p-2">Last Purchase Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">ATFC-CH7111-12</td>
                  <td className="border p-2">
                    Atlantic CH7111 (E71T-1C) 1.2mm FCAW (15kg/spool)
                  </td>
                  <td className="border p-2">1099.0000</td>
                  <td className="border p-2">0.0000</td>
                  <td className="border p-2">129.0000</td>
                  <td className="border p-2">
                    <input type="text" className="w-full p-1 border" />
                  </td>
                  <td className="border p-2">13.13</td>
                  <td className="border p-2">
                    <input type="text" className="w-full p-1 border" />
                  </td>
                  <td className="border p-2">more</td>
                  <td className="border p-2">more</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6 mb-10">
            {/* Tab Navigation */}
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`p-3 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Content" && (
              <div className="w-full table-auto p-6 bg-gray-200 border shadow-lg rounded-lg mt-4">
                <div className="flex gap-2 mb-4">
                  <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
                    Delete
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
                    Copy
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
                    Import
                  </button>
                </div>
                <table className="w-full border-collapse border border-gray-200 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        "Text",
                        "Item Code",
                        "Description",
                        "UOM",
                        "Whse",
                        "Quantity",
                        "Unit Price",
                        "Discount %",
                        "Discount Amt",
                        "Row Amount",
                        "Tax Code",
                        "Tax Amount",
                        "G/L Account",
                        "COGS Account",
                        "Cost Centre",
                        "Project Code",
                      ].map((header) => (
                        <th key={header} className="border p-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            )}

            {/* Placeholder for Other Sections */}
            {activeTab !== "Content" && (
              <div className="border p-4 rounded-lg bg-gray-50 mt-4">
                <h3 className="font-semibold">{activeTab} Section</h3>
                <p className="text-gray-500">
                  Content for {activeTab} goes here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}