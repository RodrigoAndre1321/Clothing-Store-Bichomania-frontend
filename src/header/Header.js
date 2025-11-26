import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <h1>Bichomanía</h1>
      <nav>
        <button onClick={() => navigate("/productos")}>Productos</button>
        { }
        <button onClick={() => navigate("/profile")}>Mi Perfil</button>
      </nav>
    </header>
  );
}
