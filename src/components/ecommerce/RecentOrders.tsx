import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router";

interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

const tableData: Product[] = [
  { id: 1, name: "MacBook Pro 13”", variants: "2 Variants", category: "Laptop", price: "$2399.00", status: "Delivered", image: "/images/product/product-01.jpg" },
  { id: 2, name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending", image: "/images/product/product-02.jpg" },
  { id: 3, name: "iPhone 15 Pro Max", variants: "2 Variants", category: "SmartPhone", price: "$1869.00", status: "Delivered", image: "/images/product/product-03.jpg" },
  { id: 4, name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1699.00", status: "Canceled", image: "/images/product/product-04.jpg" },
  { id: 5, name: "AirPods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered", image: "/images/product/product-05.jpg" },
];

export default function RecentOrders() {
  const [filter, setFilter] = useState<string>("All");

  // Logic to filter data based on status
  const filteredData = filter === "All" 
    ? tableData 
    : tableData.filter(item => item.status === filter);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter Dropdown */}
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-theme-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>

          <Link to="/orders">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            See all
          </button>
          </Link>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Products
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Category
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Price
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-100 dark:border-gray-800">
                      <img
                        src={product.image}
                        className="h-full w-full object-cover"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                {/* Fixed: Category and Price order corrected here */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-3 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {product.price}
                </TableCell>
                
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Delivered"
                        ? "success"
                        : product.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}