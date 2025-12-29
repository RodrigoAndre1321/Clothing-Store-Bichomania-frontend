import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetodoPago from "./MetodoPago"; 
import PagosPedido from "./PagosPedido"; 

export default function Deuda() {
    const [pagosActivos, setPagosActivos] = useState(null);
  const [deudas, setDeudas] = useState([]);
  const [compras, setCompras] = useState([]); 
  const [pedidoActivo, setPedidoActivo] = useState(null); 
  const id_cliente = localStorage.getItem("id_usuario");

  useEffect(() => {
    cargarDeudas();
    cargarCompras();
  }, []);

  const cargarDeudas = async () => {
    try {
      const r = await fetch(`${process.env.REACT_APP_API_URL}/deudas/${id_cliente}`);
      const data = await r.json();
      setDeudas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando deudas:", err);
    }
  };

  const cargarCompras = async () => {
    try {
      const r = await fetch(`${process.env.REACT_APP_API_URL}/compras/${id_cliente}`);
      const data = await r.json();
      setCompras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando compras:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mis Deudas</h1>

      {deudas.length === 0 && (
        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          No tienes deudas pendientes.
        </p>
      )}

      {deudas.map((d) => (
        <div
          key={d.id_pedido}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "8px",
            position: "relative"
          }}
        >
          <h3>Pedido #{d.id_pedido}</h3>
          <p><strong>Fecha:</strong> {d.fecha_pedido}</p>
          <p><strong>Total:</strong> S/. {d.total}</p>
          <p><strong>Pagado:</strong> S/. {d.pagado}</p>
          <p><strong>Deuda restante:</strong> S/. {d.deuda}</p>

          <button
            style={{ marginTop: "10px" }}
            onClick={() =>
              setPedidoActivo(pedidoActivo === d.id_pedido ? null : d.id_pedido)
            }
          >
            {pedidoActivo === d.id_pedido ? "Cerrar pago" : "Pagar deuda"}
          </button>

          {pedidoActivo === d.id_pedido && (
            <div
                style={{
                marginTop: "15px",
                position: "absolute",
                top: "100%",
                width: "300px", 
                zIndex: 10,
                backgroundColor: "#f9f9f9",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px"
                }}
            >
                <MetodoPago 
                  id_pedido={d.id_pedido}  
                  id_carrito={d.id_carrito} 
                  onPagoExitoso={cargarDeudas} 
                />
            </div>
          )}
            <button
                style={{ marginTop: "10px" }}
                onClick={() =>
                    setPagosActivos((prev) =>
                    prev === d.id_pedido ? null : d.id_pedido
                    )
                }
                >
                {pagosActivos === d.id_pedido ? "Ocultar pagos" : "Ver pagos"}
                </button>


                {pagosActivos === d.id_pedido && <PagosPedido id_pedido={d.id_pedido} />}
                    
        </div>
      ))}

      <h1 style={{ marginTop: "40px" }}>Mis Compras</h1>

      {compras.length === 0 && (
        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          No tienes compras completadas.
        </p>
      )}

      {compras.map((c) => (
  <div
    key={c.id_pedido}
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginTop: "10px",
      borderRadius: "8px"
    }}
  >
    <h3>Pedido #{c.id_pedido}</h3>
    <p><strong>Fecha:</strong> {c.fecha_pedido}</p>
    <p><strong>Total:</strong> S/. {c.total}</p>
    <p><strong>Pagado:</strong> S/. {c.pagado}</p>

            <button
        onClick={() => window.open(`${process.env.REACT_APP_API_URL}/boleta/${c.id_pedido}`, "_blank")}
        className="p-2 bg-green-600 text-white rounded"
        >
        Descargar boleta
        </button>
    <button
      style={{ marginTop: "10px" }}
      onClick={() =>
        setPagosActivos((prev) =>
          prev === c.id_pedido ? null : c.id_pedido
        )
      }
    >
        {pagosActivos === c.id_pedido ? "Ocultar pagos" : "Ver pagos"}
        </button>
        {pagosActivos === c.id_pedido && <PagosPedido id_pedido={c.id_pedido} />}


  </div>
))}

                  
    </div>
  );
}
