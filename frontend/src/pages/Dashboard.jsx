import { useEffect, useState } from "react";
import axios from "../api/axios";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      // 🔑 RUTA CORRECTA SEGÚN server.js
      const res = await axios.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando métricas del dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <p>Cargando dashboard...</p>;

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
