import axios from 'axios';

export default function Login() {
  const login = async () => {
    try {
      const res = await axios.post(
        'https://TU-BACKEND.onrender.com/api/auth/login',
        {
          usuario: 'admin',
          password: 'admin',
        }
      );

      alert('RESPUESTA: ' + JSON.stringify(res.data));
    } catch (error) {
      alert('ERROR: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}
