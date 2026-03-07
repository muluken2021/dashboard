import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Ecommerce Dashboard | Admin Panel"
        description="Comprehensive ecommerce store monitoring and analytics."
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* --- Top Row: Key Performance Indicators --- */}
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>

        {/* --- Middle Row: Sales & Targets --- */}
        <div className="col-span-12 8">
          <MonthlySalesChart />
        </div>

        

        {/* --- Middle Row: Long-term Trends --- */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* --- Bottom Row: Logistics & Customers --- */}
        <div className="col-span-12">
          <RecentOrders />
        </div>

        
      </div>
    </>
  );
}