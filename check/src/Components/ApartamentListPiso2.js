import React, { useState, useEffect } from 'react';
import '../Styles/App3.css';
import axios from 'axios';
import Apartment from './Apartament'; // Asegúrate de que la ruta sea correcta

const ApartmentListPiso1 = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);
  
    useEffect(() => {
      const fetchUsuarios = async () => {
        try {
          const response = await axios.get('http://localhost:5000/TorreAPiso1');
          setUsuarios(response.data);
        } catch (error) {
          console.error('Error al obtener los usuarios:', error);
        }
      };
  
      fetchUsuarios();
    }, []);
  
    const handleOpen = (apt) => {
      setSelectedApartment(apt);
      setIsModalOpen(true);
    };
  
    const handleClose = () => {
      setIsModalOpen(false);
      setSelectedApartment(null);
    };
  
    // Definir los apartamentos (puedes ajustar esto según tu lógica)
    const apartamentos = ['101', '102', '103', '104'];
  
    return (
      <div>
        {apartamentos.map((apt) => {
          // Verificar si hay un usuario registrado para el apartamento
          const usuario = usuarios.find(u => u.apartamento === apt);
          
          return (
            <Apartment 
              key={apt} 
              apt={apt} 
              isModalOpen={isModalOpen && selectedApartment === apt} 
              handleOpen={() => handleOpen(apt)} 
              handleClose={handleClose} 
              usuario={usuario} // Pasar el usuario correspondiente
            />
          );
        })}
        
        {usuarios.length === 0 && (
          <div className="no-usuarios">
            <p>El usuario de esta torre no ha sido registrado.</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ApartmentListPiso1;