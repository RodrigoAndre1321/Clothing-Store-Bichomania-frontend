import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productos from "./pages/Productos";
import Registro from "./registro/Registro";
import Home from "./home/Home";
import Login from "./login/Login";
import Header from "./header/Header";
import Profile from "./perfil_usuario/Perfil";
import Encuesta from "./encuesta/Encuesta";
import Carrito from "./carrito/Carrito";


function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<Login tipo="user" />} />
        <Route path="/login-employee" element={<Login tipo="employee" />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/encuestas" element={<Encuesta/>} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
