import axios from 'axios';
export default function Login(){
  const login = async ()=>{
    await axios.post('/api/auth/login',{usuario:'admin',password:'admin'});
    alert('Login OK');
  };
  return (
    <div style={{padding:40}}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}