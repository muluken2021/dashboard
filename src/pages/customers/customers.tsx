import { useState } from "react";
import { EnvelopeIcon, EyeIcon } from "../../icons";


// Mock Customer Data
const customersData = [
  {
    id: "CUST-001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    orders: 12,
    totalSpent: 1250.50,
    status: "VIP",
    lastOrder: "2024-03-01"
  },
  {
    id: "CUST-002",
    name: "Sarah Williams",
    email: "s.williams@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    orders: 2,
    totalSpent: 340.00,
    status: "Regular",
    lastOrder: "2024-02-15"
  },
  {
    id: "CUST-003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    orders: 1,
    totalSpent: 89.99,
    status: "New",
    lastOrder: "2024-03-02"
  }
];

export default function Customers() {
  const [customers] = useState(customersData);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VIP": return "bg-meta-3/10 text-meta-3"; // Greenish
      case "Regular": return "bg-primary/10 text-primary"; // Blue
      case "New": return "bg-meta-6/10 text-meta-6"; // Orange
      default: return "bg-gray-2 text-body";
    }
  };

  return (
    <>
      {/* <PageMeta title="Customer Directory | Ecommerce Admin" /> */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-gray-300">
          Customer Directory
        </h2>
        
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Customer</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Status</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Orders</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Total Spent</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200">Last Purchase</th>
                <th className="px-4 py-4 font-medium text-black dark:text-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-stroke dark:border-white/[0.03]  ">
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full overflow-hidden border border-stroke">
                        <img src={customer.avatar} alt={customer.name} />
                      </div>
                      <div>
                        <p className="font-medium text-black dark:text-gray-200 leading-none">{customer.name}</p>
                        <p className="text-sm  text-black dark:text-gray-400 text-body mt-1">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className={`inline-flex rounded-full dark:text-gray-400  px-3 py-1 text-xs font-medium ${getStatusBadge(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-black dark:text-gray-400 font-medium">
                    {customer.orders}
                  </td>
                  <td className="px-4 dark:text-gray-400  py-5 text-meta-3 font-semibold">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 dark:text-gray-400  py-5 text-body text-sm">
                    {customer.lastOrder}
                  </td>
                  <td className="px-4 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button title="Contact" className="p-2 dark:text-gray-400  hover:text-primary transition">
                        <EnvelopeIcon className="h-5 w-5" />
                      </button>
                      <button title="View Profile" className="p-2 dark:text-gray-400  hover:text-primary transition">
                        <EyeIcon className="h-5 w-5" />
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