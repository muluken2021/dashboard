import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function AnalyticsChart() {
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: ["#0B4E4E"],
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Outfit, sans-serif",
    },
    // REMOVING NUMBERS FROM GRAPH
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9, // Keeping that deep shade you like
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#0B4E4E",
            opacity: 0.8
          },
          {
            offset: 100,
            color: "#FFFFFF",
            opacity: 0
          }
        ]
      },
    },
    markers: {
      size: 4,
      colors: ["#0B4E4E"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "#F1F5F9",
      padding: {
        bottom: 15, // Extra spacing for the bottom numbers
      },
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      type: "category",
      categories: ["5k", "10k", "15k", "20k", "25k", "30k", "35k", "40k", "45k", "50k", "55k", "60k"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        offsetY: 8, // Spacing the bottom numbers further apart from the grid
        style: { 
          colors: "#94A3B8", 
          fontSize: "12px",
          fontWeight: 500 
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}%`,
        style: { colors: "#94A3B8", fontSize: "12px" },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return (
          '<div class="relative bg-[#0B4E4E] text-white px-3 py-1 rounded shadow-lg text-xs font-bold">' +
          "<span>" + series[seriesIndex][dataPointIndex].toLocaleString() + "</span>" +
          '<div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0B4E4E] rotate-45"></div>' +
          "</div>"
        );
      },
    },
  };

  const series = [
    {
      name: "Performance",
      data: [18, 45, 30, 52, 88, 40, 55, 32, 48, 65, 42, 58],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Analytics Performance
        </h3>
        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
            <MoreDotIcon className="text-gray-400 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem onItemClick={() => setIsOpen(false)}>View Details</DropdownItem>
            <DropdownItem onItemClick={() => setIsOpen(false)}>Settings</DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="-ml-5 min-w-[650px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
}