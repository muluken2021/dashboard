import { useState, useMemo } from "react";
import { ArrowDownIcon, TrashBinIcon } from "../../icons";

const initialTransactions = [
  { id: "TRX-9901", customer: "Alex Johnson", amount: 129.99, method: "Visa **** 4242", status: "Succeeded", date: "2024-03-01 14:22" },
  { id: "TRX-9902", customer: "Sarah Williams", amount: 299.00, method: "PayPal", status: "Processing", date: "2024-03-02 09:15" },
  { id: "TRX-9903", customer: "Michael Chen", amount: 89.99, method: "MasterCard **** 8812", status: "Refunded", date: "2024-03-02 11:45" },
  { id: "TRX-9904", customer: "Emma Davis", amount: 45.50, method: "Apple Pay", status: "Failed", date: "2024-03-03 16:30" },
];

export default function Payments() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // --- Search & Filter Logic ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      const matchesSearch = 
        trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || trx.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, filterStatus]);

  // --- Handlers ---
  const handleRefund = (id: string) => {
    if (window.confirm("Are you sure you want to refund this transaction?")) {
      setTransactions(prev => prev.map(trx => 
        trx.id === id ? { ...trx, status: "Refunded" } : trx
      ));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this transaction record? This cannot be undone.")) {
      setTransactions(prev => prev.filter(trx => trx.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Succeeded": return "bg-success/10 text-success";
      case "Processing": return "bg-warning/10 text-warning";
      case "Refunded": return "bg-primary/10 text-primary";
      case "Failed": return "bg-danger/10 text-danger";
      default: return "bg-gray-2 text-body";
    }
  };

  return (
    <>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-title-md2 font-bold text-black dark:text-gray-400">
            Transactions ({filteredTransactions.length})
          </h2>
          <p className="text-sm font-medium text-body text-black dark:text-gray-400">Monitor and manage store payments</p>
        </div>
        <button className="bg-brand-600 text-gray-200 flex items-center gap-2 rounded bg-primary px-5 py-2.5 font-medium  hover:bg-opacity-90 transition">
          <ArrowDownIcon className="h-5 w-5 rotate-180" />
          Export Statement
        </button>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <input
          type="text"
          placeholder="Search ID or Customer..."
          className="w-full max-w-md rounded border border-stroke bg-gray py-2 px-4 outline-none focus:border-primary dark:border-white/[0.03] dark:bg-meta-4 text-black dark:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="rounded border border-stroke bg-transparent px-4 py-2 outline-none dark:border-white/[0.03] text-black dark:text-gray-400"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Succeeded">Succeeded</option>
          <option value="Processing">Processing</option>
          <option value="Refunded">Refunded</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Transaction ID</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Customer</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Method/Date</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Amount</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Status</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-stroke dark:border-white/[0.03] hover:bg-gray-1  transition-colors">
                  <td className="px-4 py-5 font-medium text-black dark:text-gray-400">{trx.id}</td>
                  <td className="px-4 py-5 text-black dark:text-gray-400">{trx.customer}</td>
                  <td className="px-4 py-5">
                    <p className="text-sm text-black dark:text-gray-400">{trx.method}</p>
                    <p className="text-xs text-black dark:text-gray-500 text-body">{trx.date}</p>
                  </td>
                  <td className="px-4 py-5 font-bold text-black dark:text-gray-400">
                    ${trx.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-5">
                    <span className={`inline-flex text-black dark:text-gray-400 rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(trx.status)}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <div className="text-black dark:text-gray-400 flex justify-end items-center gap-3">
                      {trx.status === "Succeeded" && (
                        <button 
                          onClick={() => handleRefund(trx.id)}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Refund
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(trx.id)}
                        className="hover:text-danger transition"
                        title="Delete record"
                      >
                        <TrashBinIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}