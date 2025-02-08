import React, { useState, useEffect } from "react";
import TransactionModal from "./TransactionModal";

function TransactionList({ transactionType, authToken }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/${transactionType}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch transactions.");

      const data = await response.json();
      setTransactions(data.items || []);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [transactionType]);

  const handleAddNew = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {transactionType.toUpperCase()} List
      </h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleAddNew}
      >
        Add New
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Document ID</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.customer}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transaction.totalAmount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <TransactionModal
          transactionType={transactionType}
          transaction={selectedTransaction}
          onClose={() => setIsModalOpen(false)}
          refresh={fetchTransactions}
        />
      )}
    </div>
  );
}

export default TransactionList;
