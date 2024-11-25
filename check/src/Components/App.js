import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from '../Screen/Home';
import Login from '../Screen/Login';
import Registro from '../Screen/Registro';
import InicioVig from '../Screen/InicioVig';
import InicioAdmin from '../Screen/InicioAdmin'; // Agregar importación
import PaginaPrincipalResidente from '../Screen/PaginaPrincipalResidente';
import InicioResi from '../Screen/InicioResi'; // Agregar importación
import TorreAComponent from '../Screen/TorreA';
import TorreBComponent from '../Screen/TorreB';
import TorreCComponent from '../Screen/TorreC';
import TorreDComponent from '../Screen/TorreD'; // Agregar importación
import VerAgendamiento from '../Screen/VerAgendamiento';
import VerReportes from '../Screen/VerReportes';
import VisitaSorpresa from '../Screen/VisitaSorpresa';
import SolicitudAgendamiento from '../Screen/SolicitudAgendamiento';
import NuevoPerfil from '../Screen/NuevaCuenta';
import Cuenta from '../Screen/Perfil';
import Actualizar from '../Screen/ActualizarPerfil';
import HistorialAgendamientos from '../Screen/HistorialAgendamientos';
import RecuperarContrasena from '../Screen/RecuperarContrasena';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/InicioVig" element={<InicioVig />} />
        <Route path="/InicioAdmin" element={<InicioAdmin />} />
        <Route path="/InicioResi" element={<InicioResi />} />
        <Route path="/PaginaPrincipalResidente" element={<PaginaPrincipalResidente />} />
        <Route path="/TorreA" element={<TorreAComponent />} />
        <Route path="/TorreB" element={<TorreBComponent />} />
        <Route path="/TorreC" element={<TorreCComponent />} />
        <Route path="/TorreD" element={<TorreDComponent />} />
        <Route path="/VerAgendamiento" element={<VerAgendamiento />} />
        <Route path="/VerReportes" element={<VerReportes />} />
        <Route path="/VisitaSorpresa" element={<VisitaSorpresa />} />
        <Route path="/SolicitudAgendamiento" element={<SolicitudAgendamiento />} />
        <Route path="/NuevaCuenta" element={<NuevoPerfil />} />
        <Route path="/Perfil" element={<Cuenta />} />
        <Route path="/ActualizarPerfil" element={<Actualizar />} />
        <Route path="/HistorialAgendamientos" element={<HistorialAgendamientos />} />
      </Routes>
    </Router>
  );
};

export default App;