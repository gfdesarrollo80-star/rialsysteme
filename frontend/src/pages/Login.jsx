export default function Login() {
  const login = () => {
    alert('CLICK OK');
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Tesorería</h2>
      <button onClick={login}>Ingresar</button>
    </div>
  );
}

