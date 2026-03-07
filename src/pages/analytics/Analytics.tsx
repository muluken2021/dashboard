import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../components/ecommerce/DemographicCard";
// Assuming these are your existing chart wrappers


export default function Analytics() {
  return (
    <>
      {/* <PageMeta title="Business Analytics | Ecommerce Admin" /> */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Business Intelligence
        </h2>
        <div className="flex items-center gap-3">
          <select className="rounded border border-stroke bg-white px-4 py-2 outline-none dark:border-strokedark dark:bg-boxdark">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
         {/* --- Customer Growth (Line/Area Chart) --- */}
        <div className="col-span-12 ">
            {/* Reusing ChartOne with different data series */}
            <MonthlySalesChart /> 
        </div>


        {/* --- Sales Growth (Line Chart) --- */}
        <div className="col-span-12">  
            <StatisticsChart /> {/* Configure this to show 'Sales Over Time' */}
        </div>


        {/* --- Revenue Comparison (Bar Chart) --- */}
        <div className="col-span-12 xl:col-span-6">
            
            <MonthlyTarget /> {/* Configure for Revenue Bar Bars */}
            
        </div>

       
        <div className="col-span-12 xl:col-span-6">
            {/* Reusing ChartOne with different data series */}
            <DemographicCard /> 
        </div>
      </div>
    </>
  );
}