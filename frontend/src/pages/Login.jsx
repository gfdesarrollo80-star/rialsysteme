import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function Login(){
  const login = async ()=>{
    await api.post('/api/auth/login', {
      usuario: 'admin',
      password: 'admin'
    });

    alert('Login OK');
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}
