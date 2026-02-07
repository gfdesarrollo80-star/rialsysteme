const Loader = ({ text = "Cargando..." }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <strong>{text}</strong>
    </div>
  );
};

export default Loader;
