"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ConversionVendedoresChart() {
  const options: any = {
    chart: {
      fontFamily: "inherit",
      foreColor: "#7b8fa3",
      toolbar: { show: false },
      animations: { speed: 500 },
    },
    colors: ["#1E3A5F"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: "55%",
        distributed: true,
      },
    },
    colors: ["#1E3A5F", "#C8541A", "#4A7C3F", "#D4A017", "#C8B89A"],
    dataLabels: {
      enabled: true,
      formatter: (v: number) => `${v}%`,
      style: { fontSize: "12px", fontWeight: "bold", colors: ["#fff"] },
    },
    xaxis: {
      categories: ["Ana Rodríguez", "Luis Méndez", "Carla Vásquez", "Pedro Soto", "María Torres"],
      labels: { formatter: (v: number) => `${v}%` },
      max: 100,
    },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    grid: { borderColor: "#e2e8f020", strokeDashArray: 3 },
    legend: { show: false },
    tooltip: {
      theme: "dark",
      y: { formatter: (v: number) => `${v}% tasa de conversión` },
    },
  };

  return (
    <div className="rounded-2xl shadow-md bg-background p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-base font-semibold text-dark dark:text-white">Conversión por Vendedor</h5>
          <p className="text-sm text-darklink">Cotizaciones aprobadas vs emitidas</p>
        </div>
      </div>
      <Chart
        options={options}
        series={[{ name: "Conversión", data: [78, 65, 82, 55, 70] }]}
        type="bar"
        height="240px"
        width="100%"
      />
    </div>
  );
}
