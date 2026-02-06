import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://rialsysteme-backend.onrender.com/api/auth/login",
        {
          usuario: "admin",
          password: "admin",
        }
      );

      // Guardar sesión
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);
      localStorage.setItem("nombre", res.data.nombre);

      // 👉 IR AL DASHBOARD
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}
