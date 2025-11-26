import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Encuestas() {
  const [idEmpleado, setIdEmpleado] = useState("");
  const [encuestas, setEncuestas] = useState([]);
  const [data, setData] = useState([]);
  const exportarExcelData = (json, nombre) => {
    if (json.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombre);

    XLSX.writeFile(workbook, `${nombre}.xlsx`);

  };
  const obtenerEncuestas = async () => {
    if (!idEmpleado) return alert("Ingresa un ID de empleado");

    const res  = await fetch(`http://localhost:3001/encuestas?id_empleado=${idEmpleado}`);

    const data = await res.json();
    setEncuestas(data);
    setData(data); 
  };
  const obtenerClientes = async () => {
    const res = await fetch("http://localhost:3001/clientes");
    const json = await res.json();
    setData(json);

    exportarExcelData(json, "clientes");
  };
  const obtenerActivas = async () => {
    const res = await fetch("http://localhost:3001/encuestas-activas");
    const json = await res.json();
    setData(json);

    exportarExcelData(json, "encuestas_activas");
  };
  const cerrarEncuesta = async (id) => {
    await fetch(`http://localhost:3001/cerrar_encuesta/${id}`, {
  method: "PUT"
});


    alert("Encuesta cerrada");
    obtenerActivas();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sistema de Encuestas</h2>

      <input
        type="number"
        placeholder="ID empleado"
        value={idEmpleado}
        onChange={(e) => setIdEmpleado(e.target.value)}
      />

      <br /><br />

      <button onClick={obtenerEncuestas}>Mostrar encuestas del empleado</button>

      <button onClick={obtenerClientes} style={{ marginLeft: 10 }}>
        Mostrar clientes (exporta)
      </button>

      <button onClick={obtenerActivas} style={{ marginLeft: 10 }}>
        Encuestas activas (exporta)
      </button>

      <hr />

      {data.length > 0 && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              {Object.keys(data[0]).map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((fila, i) => (
              <tr key={i}>
                {Object.keys(fila).map((k) => (
                  <td key={k}>
                    {fila[k]}

                    {}
                    
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div> 
  );
}



/*
{k === "id_encuesta" && (
                      <button
                        style={{ marginLeft: 10 }}
                        onClick={() => cerrarEncuesta(fila[k])}
                      >
                        Cerrar
                      </button>
                    )} */