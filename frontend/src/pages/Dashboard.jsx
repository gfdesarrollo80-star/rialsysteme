export default function Dashboard() {
  const nombre = localStorage.getItem("nombre");
  const rol = localStorage.getItem("rol");

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, <strong>{nombre}</strong></p>
      <p>Rol: {rol}</p>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
