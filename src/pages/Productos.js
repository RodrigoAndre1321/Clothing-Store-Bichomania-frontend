import { useEffect, useState } from "react";

export default function Productos() {
  const [categorias, setCategorias] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [productos, setProductos] = useState([]);

  const [filtros, setFiltros] = useState({
    categoria: "",
    competencia: "",
    equipo: "",
    marca: ""
  });

  useEffect(() => {
    fetch("http://localhost:3001/listas")
      .then(res => res.json())
      .then(data => {
        setCategorias(data.categorias);
        setCompetencias(data.competencias);
        setEquipos(data.equipos);
        setMarcas(data.marcas);
      });
  }, []);

  const buscarProductos = () => {
    const query = new URLSearchParams(filtros).toString();

    fetch(`http://localhost:3001/productos?${query}`)
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Productos</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}>
          <option value="">Categoría</option>
          {categorias.map(c => (
            <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
          ))}
        </select>

        <select onChange={(e) => setFiltros({...filtros, competencia: e.target.value})}>
          <option value="">Competencia</option>
          {competencias.map(x => (
            <option key={x.id_competencia} value={x.id_competencia}>{x.nombre}</option>
          ))}
        </select>

        <select onChange={(e) => setFiltros({...filtros, equipo: e.target.value})}>
          <option value="">Equipo</option>
          {equipos.map(e => (
            <option key={e.id_equipo} value={e.id_equipo}>{e.nombre}</option>
          ))}
        </select>

        <select onChange={(e) => setFiltros({...filtros, marca: e.target.value})}>
          <option value="">Marca</option>
          {marcas.map(m => (
            <option key={m.id_marca} value={m.id_marca}>{m.nombre}</option>
          ))}
        </select>

        <button onClick={buscarProductos}>Buscar</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {productos.map(p => (
          <div key={p.id_producto} 
            style={{
              width: "200px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px"
            }}>
            <img src={p.imagen} alt="" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{p.nombre_producto}</h3>
            <p>Precio: S/. {p.precio}</p>
            <p>Categoría: {p.categoria}</p>
            <p>Competencia: {p.competencia}</p>

            {}
            <button 
              style={{ marginTop: "10px", width: "100%", padding: "8px", cursor: "pointer" }}
              onClick={() => console.log("Agregar al carrito", p.id_producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
