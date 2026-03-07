import React, { useState, useMemo } from "react";
import ordersData from "../../data/orders.json";
import { ArrowDownIcon, EyeIcon, TrashBinIcon } from "../../icons"; // Using EyeIcon for view
import { Modal } from "../../components/ui/modal/index";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // --- Search & Filter Logic ---
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  // --- Handlers ---
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order record?")) {
      setOrders(orders.filter(o => o.orderId !== orderId));
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-success/10 text-success";
      case "Shipped": return "bg-primary/10 text-primary";
      case "Pending": return "bg-warning/10 text-warning";
      case "Cancelled": return "bg-danger/10 text-danger";
      default: return "bg-gray-2 text-body";
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-gray-300">
          Manage Orders ({filteredOrders.length})
        </h2>
        <button className="flex items-center gap-2 rounded border border-stroke bg-white px-4 py-2 font-medium text-black hover:shadow-1 dark:border-white/[0.03] dark:bg-meta-4 dark:text-gray-300">
          <ArrowDownIcon className="h-5 w-5" />
          Export CSV
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <input
          type="text"
          placeholder="Search Order ID or Customer..."
          className="w-full max-w-md rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-white/[0.03] dark:bg-meta-4 text-black dark:text-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="rounded border border-stroke bg-transparent px-4 py-2 outline-none dark:border-white/[0.03] text-black dark:text-gray-300"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* ORDERS TABLE */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
             <tr className="bg-gray-2 text-left dark:bg-white/[0.03]">
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Order ID</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Customer</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Amount</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200 text-center">Status</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="border-b border-stroke dark:border-white/[0.03]">
                  <td className="px-4 py-5 font-medium text-black dark:text-gray-300">{order.orderId}</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <img src={order.customer.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="font-medium text-black dark:text-gray-300">{order.customer.name}</p>
                        <p className="text-xs text-body dark:text-gray-300">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-medium text-black dark:text-gray-300">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-5 text-center">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm text-black dark:text-gray-300 font-medium ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <div className="flex justify-end gap-3 text-black dark:text-gray-300">
                      <button onClick={() => handleViewOrder(order)} className="hover:text-primary"><EyeIcon className="h-5 w-5" /></button>
                      <button onClick={() => handleDeleteOrder(order.orderId)} className="hover:text-danger"><TrashBinIcon className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAIL MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[600px] p-8">
        {selectedOrder && (
          <div className="no-scrollbar max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-gray-300">Order Details</h3>
                <p className="text-sm text-body">{selectedOrder.orderId} • {selectedOrder.date}</p>
              </div>
              <span className={`rounded-full px-4 py-1 text-sm font-medium ${getStatusStyles(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="border-y border-stroke py-4 dark:border-white/[0.03] mb-6">
              <h4 className="font-bold text-black dark:text-gray-300 mb-2">Customer Info</h4>
              <p className="text-sm">{selectedOrder.customer.name}</p>
              <p className="text-sm">{selectedOrder.customer.email}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-black dark:text-gray-300 mb-3">Items</h4>
              <div className="flex justify-between items-center bg-gray-2 p-3 rounded dark:bg-meta-4">
                <p className="text-black dark:text-gray-300">{selectedOrder.product}</p>
                <p className="font-bold text-black dark:text-gray-300">${selectedOrder.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-black dark:text-gray-300">Update Status</h4>
              <div className="flex flex-wrap gap-2">
                {["Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateOrderStatus(selectedOrder.orderId, s)}
                    className={`rounded px-3 py-1 text-xs font-medium border transition ${
                      selectedOrder.status === s 
                      ? "bg-primary border-primary text-white" 
                      : "border-stroke hover:border-primary dark:border-white/[0.03]"
                    }`}
                  >
                    Set as {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}