import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ tipo }) {
  const [datos, setDatos] = useState({ correo: "", password: "" });
  const navigate = useNavigate();

  const actualizar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviarLogin = async (e) => {
    e.preventDefault();

    const url =
      tipo === "user"
        ? "http://localhost:3001/login/user"
        : "http://localhost:3001/login/employee";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      console.log("Status:", res.status); 

      if (!res.ok) {
        const errText = await res.text();
        alert(errText || "Error en login");
        return;
      }

      const msg = await res.json();
      console.log("Respuesta JSON:", msg);

      if (tipo === "user") {
        localStorage.setItem("rol", msg.usuario.rol);
        localStorage.setItem("id_usuario", msg.usuario.id);
      } else {
        localStorage.setItem("rol", msg.empleado.rol);
        localStorage.setItem("id_usuario", msg.empleado.id);
      }

      alert(msg.message || "Login exitoso");

      if (tipo === "user") {
        navigate("/productos", { replace: true });
      } else {

        navigate("/encuestas", { replace: true });;
      }
    } catch (error) {
      console.error("ERROR FRONT:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Login {tipo === "user" ? "Cliente" : "Empleado"}</h2>
      <form onSubmit={enviarLogin}>
        <input
          type="text"
          name="correo"
          placeholder="Correo"
          value={datos.correo}
          onChange={actualizar}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={datos.password}
          onChange={actualizar}
        />
        <button type="submit">Ingresar</button>
      </form>

      {tipo === "user" && (
        <button onClick={() => navigate("/registro")}>Registrate</button>
      )}
    </div>
  );
}

