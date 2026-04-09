"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EstadoOrdenesChart() {
  const options: any = {
    chart: {
      fontFamily: "inherit",
      toolbar: { show: false },
      animations: { speed: 500 },
    },
    colors: ["#D4A017", "#1E3A5F", "#C8541A", "#4A7C3F"],
    labels: ["En Producción", "En Diseño", "Listas", "Entregadas"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "inherit",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "13px",
              color: "#7b8fa3",
              formatter: () => "58",
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "dark",
      y: { formatter: (v: number) => `${v} órdenes` },
    },
    stroke: { width: 0 },
  };

  return (
    <div className="rounded-2xl shadow-md bg-background p-6 w-full h-full">
      <h5 className="text-base font-semibold text-dark dark:text-white mb-1">Estado de Órdenes</h5>
      <p className="text-sm text-darklink mb-2">Distribución actual</p>
      <Chart
        options={options}
        series={[17, 12, 15, 14]}
        type="donut"
        height="280px"
        width="100%"
      />
    </div>
  );
}
