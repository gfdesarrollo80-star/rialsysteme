import { useEffect, useState } from "react";
import axios from "../api/axios";
import StatCard from "../components/dashboard/StatCard";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get("/dashboard");
      setStats(res.data);
    };
    load();
  }, []);

  if (!stats) return <Loader text="Cargando dashboard..." />;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        <StatCard title="Usuarios Totales" value={stats.totalUsers} />
        <StatCard title="Usuarios Activos" value={stats.activeUsers} />
        <StatCard title="Usuarios Inactivos" value={stats.inactiveUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
