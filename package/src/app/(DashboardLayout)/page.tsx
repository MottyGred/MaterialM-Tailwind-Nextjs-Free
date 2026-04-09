import KPICards from "../components/dashboard/KPICards";
import VentasMensualesChart from "../components/dashboard/VentasMensualesChart";
import EstadoOrdenesChart from "../components/dashboard/EstadoOrdenesChart";
import ConversionVendedoresChart from "../components/dashboard/ConversionVendedoresChart";
import OrdenesRecientes from "../components/dashboard/OrdenesRecientes";
import AlertasPanel from "../components/dashboard/AlertasPanel";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Dashboard Ejecutivo</h1>
        <p className="text-sm text-darklink mt-1">Resumen operativo — Haladás Taller Creativo · Hoy, miércoles 9 de abril 2025</p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <VentasMensualesChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <EstadoOrdenesChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ConversionVendedoresChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <AlertasPanel />
        </div>
      </div>

      {/* Orders Table */}
      <OrdenesRecientes />
    </div>
  );
}
