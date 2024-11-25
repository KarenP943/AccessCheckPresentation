import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../Styles/App3.css';

const AgendamientoCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // Verificamos si hay datos para mostrar
  if (!data) {
    return null; // No se renderiza el componente si no hay datos
  }

  return (
    <div className="agendamiento-card col-8 mx-auto">
      <h2 style={{ color: '#6e3f1d' }}>
        <i className="fas fa-building" style={{ color: '#6e3f1d' }} /> Torre {data.torre}
      </h2>
      <h3 style={{ color: '#6e3f1d' }}>
        <i className="fas fa-door-open" style={{ color: '#6e3f1d' }} /> Apartamento {data.apartamento}
      </h3>
      <p>
        <i className="fas fa-user" style={{ color: '#6e3f1d' }} /> Nombre Visitante: {data.nombreVisitante}
      </p>
      <p>
        <i className="fas fa-user" style={{ color: '#6e3f1d' }} /> Apellido Visitante: {data.apellidos}
      </p>

      <p>
        <i className="fas fa-clock" style={{ color: '#6e3f1d' }} /> Hora de entrada: {data.horaInicio}
      </p>
      <p>
        <i className="fas fa-car" style={{ color: '#6e3f1d' }} /> Vehiculo: {data.tipoVehiculo}
      </p>
      <p>
        <i className="fas fa-car" style={{ color: '#6e3f1d' }} /> Placa: {data.placaVehiculo}
      </p>
      <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
          Ver más
        </Button>
        <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles Agendamiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li><i className="fas fa-user" /> Nombre Visitante Principal: {data.nombreVisitante}</li>
              <li><i className="fas fa-user" /> Apellido Visitante Principal: {data.apellidos}</li>
              <li><i className="fas fa-phone" /> Teléfono: {data.telefono}</li>
              <li><i className="fas fa-parking" /> Vehiculo: {data.tipoVehiculo}</li>
              <li><i className="fas fa-car" /> Placa: {data.placaVehiculo}</li>
              <li><i className="fas fa-id-card" /> Tipo de Documento: {data.tipoDocumento}</li>
              <li><i className="fas fa-id-badge" /> Número de Documento: {data.numDoc}</li>
              <li><i className="fas fa-tags" /> Cantidad de Visitantes: {data.numPersonas}</li>
              <li><i className="fas fa-calendar-alt" /> Fecha de entrada: {data.fechaInicio}</li>
              <li><i className="fas fa-clock" /> Hora de entrada: {data.horaInicio}</li>
              <li><i className="fas fa-calendar-alt" /> Fecha de salida: {data.fechaFin}</li>
              <li><i className="fas fa-clock" /> Hora de Salida: {data.horaFin}</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AgendamientoCard;