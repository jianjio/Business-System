import React, { useState, useEffect, useCallback } from "react";
import InventoryForm from "../components/InventoryForm";

function InventoryPage({ authToken }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formMode, setFormMode] = useState("Add");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "itemCode",
    direction: "asc",
  });
  const [columnWidths, setColumnWidths] = useState({
    itemCode: 150,
    itemDescription: 250,
    itemGroup: 100,
    unitOfMeasurement: 100,
    unitPrice: 150,
    lastPurchasePrice: 150,
  });

  const itemsPerPage = 10;
  const headers = [
    { key: "itemCode", label: "Item Code" },
    { key: "itemDescription", label: "Description" },
    { key: "itemGroup", label: "Group" },
    { key: "unitOfMeasurement", label: "UOM" },
    { key: "unitPrice", label: "Unit Price" },
    { key: "lastPurchasePrice", label: "Last Purchase" },
  ];

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(
        "https://fifpi-api.onrender.com/api/inventory",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch items.");
      const data = await response.json();
      setItems(data.items || []);
      setFilteredItems(data.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [authToken]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredItems(sortedItems);
  };

  const handleResize = (key, e) => {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const onMouseMove = (event) => {
      const newWidth = Math.max(50, startWidth + (event.clientX - startX));
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [key]: newWidth,
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setFormMode("Add");
  };

  const handleFindUpdate = () => {
    setSelectedItem(null);
    setFormMode("Find/Update");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.itemDescription.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredItems.length / itemsPerPage)
    ) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-200 rounded-lg shadow-md">
      {/* Form Container */}
      <div className="col-span-1">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-md ${
              formMode === "Add" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Add Item
          </button>
          <button
            onClick={handleFindUpdate}
            className={`px-4 py-2 rounded-md hover:bg-gray-400 ${
              formMode === "Find/Update"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Find/Update
          </button>
        </div>

        <InventoryForm
          authToken={authToken}
          formMode={formMode}
          initialData={selectedItem}
          onSuccess={fetchItems}
        />
      </div>

      {/* Table Container */}
      <div className="col-span-2 overflow-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Inventory Items</h2>

        {/* Search Bar */}
        {formMode === "Find/Update" && (
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by item description..."
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
        )}

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {headers.map((col) => (
                <th
                  key={col.key}
                  style={{ width: `${columnWidths[col.key]}px` }}
                  className="border border-gray-300 px-4 py-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      onClick={() => handleSort(col.key)}
                      className="cursor-pointer"
                    >
                      {col.label}
                      {sortConfig.key === col.key && (
                        <span>
                          {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                        </span>
                      )}
                    </span>
                    <div
                      onMouseDown={(e) => handleResize(col.key, e)}
                      className="w-2 h-full absolute top-0 right-0 cursor-col-resize hover:bg-gray-400"
                    />
                  </div>
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.itemCode}>
                {headers.map((col) => (
                  <td
                    key={col.key}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {col.key === "unitPrice" || col.key === "lastPurchasePrice"
                      ? Number(item[col.key]).toFixed(2)
                      : item[col.key]}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange("prev")}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredItems.length / itemsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={
              currentPage === Math.ceil(filteredItems.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
