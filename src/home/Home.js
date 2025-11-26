import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido</h1>
      <button onClick={() => navigate("/login-user")}>Cliente</button>
      <button onClick={() => navigate("/login-employee")}>Empleado</button>
    </div>
  );
}
