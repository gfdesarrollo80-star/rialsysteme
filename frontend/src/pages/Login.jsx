import axios from 'axios';

// URL del backend tomada desde variables de entorno (Render / Vite)
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const login = async () => {
    try {
      // Validación simple para evitar errores silenciosos
      if (!API_URL) {
        alert('ERROR: VITE_API_URL no está definida');
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          usuario: 'admin',
          password: 'admin',
        }
      );

      alert('LOGIN OK:\n' + JSON.stringify(response.data, null, 2));
      console.log('LOGIN OK:', response.data);
    } catch (error) {
      console.error('ERROR LOGIN:', error);
      alert(
        'ERROR LOGIN:\n' +
          (error.response
            ? JSON.stringify(error.response.data, null, 2)
            : error.message)
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}
