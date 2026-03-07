import {
  ArrowDownIcon,
  ArrowUpIcon,
  
} from "../../icons";

// Mocking icons based on your image
const UserIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.61.02-.92.05 1.17.87 1.92 2.08 1.92 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);

const BoxIconLine = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.61.02-.92.05 1.17.87 1.92 2.08 1.92 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);

const ChartIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);

const HistoryIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function EcommerceMetrics() {
  const metrics = [
    {
      title: "Total User",
      value: "40,689",
      change: "8.5%",
      isUp: true,
      timeframe: "Up from yesterday",
      icon: <UserIcon />,
      variant: "purple" // Matching pastel colors from image
    },
    {
      title: "Total Revenue",
      value: "10,293",
      change: "1.3%",
      isUp: true,
      timeframe: "Up from past week",
      icon: <BoxIconLine />,
      variant: "orange"
    },
    {
      title: "Total Sales",
      value: "$89,000",
      change: "4.3%",
      isUp: false,
      timeframe: "Down from yesterday",
      icon: <ChartIcon />,
      variant: "green"
    },
    {
      title: "Total Pending",
      value: "2040",
      change: "1.8%",
      isUp: true,
      timeframe: "Up from yesterday",
      icon: <HistoryIcon />,
      variant: "rose"
    },
  ];

 

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {metrics.map((item, index) => (
        <div 
          key={index} 
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h4 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </h4>
            </div>
            
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-gray-700 dark:text-white`}>
              {item.icon}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm font-bold ${item.isUp ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
              {item.isUp ? <ArrowUpIcon className="size-4" /> : <ArrowDownIcon className="size-4" />}
              {item.change}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.timeframe}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}