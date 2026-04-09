"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function VentasMensualesChart() {
  const options: any = {
    chart: {
      fontFamily: "inherit",
      foreColor: "#7b8fa3",
      toolbar: { show: false },
      animations: { speed: 600 },
    },
    colors: ["#1E3A5F", "#C8541A"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0.02,
        stops: [0, 100],
      },
    },
    stroke: { curve: "smooth", width: 2.5 },
    grid: {
      show: true,
      strokeDashArray: 4,
      borderColor: "#e2e8f020",
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (v: number) => `RD$ ${(v / 1000).toFixed(0)}k`,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (v: number) => `RD$ ${v.toLocaleString()}`,
      },
    },
    dataLabels: { enabled: false },
  };

  const series = [
    {
      name: "2025",
      type: "area",
      data: [38000, 52000, 47000, 61000, 55000, 72000, 68000, 80000, 75000, 90000, 85000, 110000],
    },
    {
      name: "2024",
      type: "area",
      data: [25000, 35000, 30000, 42000, 38000, 55000, 50000, 62000, 58000, 70000, 65000, 85000],
    },
  ];

  return (
    <div className="rounded-2xl shadow-md bg-background p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-base font-semibold text-dark dark:text-white">Ventas Mensuales</h5>
          <p className="text-sm text-darklink">Comparación anual 2024 vs 2025</p>
        </div>
        <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
          ↑ 29.4% vs año anterior
        </span>
      </div>
      <Chart options={options} series={series} type="area" height="300px" width="100%" />
    </div>
  );
}
