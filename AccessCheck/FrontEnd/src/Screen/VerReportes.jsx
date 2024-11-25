import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables, CategoryScale } from 'chart.js'; // Importa CategoryScale
import Calendar from 'react-calendar';
import { jsPDF } from 'jspdf';
import HeaderReportes from '../Components/HeaderReportes';
import Footer from '../Components/Footer';
import '../Styles/App3.css';

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables, CategoryScale); // Registra CategoryScale

const VerReportes = () => {
  const [dataDia, setDataDia] = useState([]); 
  const [dataSemana, setDataSemana] = useState([]); 
  const [dataMes, setDataMes] = useState([]); 
  const [date, setDate] = useState(new Date()); // Estado para la fecha del calendario

  // Referencias para los gráficos
  const chartDiaRef = useRef(null);
  const chartSemanaRef = useRef(null);
  const chartMesRef = useRef(null);

  // Simulación de datos para diferentes fechas
  const simulatedData = {
    '2024-11-09': {
      daily: [10, 20, 30, 25, 15, 5], // Datos para el 9 de noviembre
      weekly: [50, 70, 60, 90, 80, 100, 75], // Datos para la semana correspondiente
      monthly: [300, 400, 350, 500], // Datos para el mes correspondiente
    },
    // Agrega más fechas y sus datos aquí
  };

  useEffect(() => {
    // Cargar datos iniciales
    loadDataForDate(date);
  }, [date]);

  const loadDataForDate = (selectedDate) => {
    const dateString = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const data = simulatedData[dateString] || {
      daily: [0, 0, 0, 0, 0, 0],
      weekly: [0, 0, 0, 0, 0, 0, 0],
      monthly: [0, 0, 0, 0],
    };
    setDataDia(data.daily);
    setDataSemana(data.weekly);
    setDataMes(data.monthly);
  };

  useEffect(() => {
    const generarGraficos = () => {
      generarGraficoDiario();
      generarGraficoSemanal();
      generarGraficoMensual();
    };

    generarGraficos();
  }, [dataDia, dataSemana, dataMes]); // Dependencias para regenerar gráficos cuando los datos cambian

  const generarGraficoDiario = () => {
    if (chartDiaRef.current) {
      chartDiaRef.current.destroy();
    }
    const ctxDia = document.getElementById('chart-dia').getContext('2d');
    chartDiaRef.current = new Chart(ctxDia, {
      type: 'bar',
      data: {
        labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [{
          label: 'Visitas por Hora',
          data: dataDia, 
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FFC107', '#FF5722']
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category', // Asegúrate de que el tipo de escala sea 'category'
          },
          y: {
            beginAtZero: true // Comenzar en cero
          }
        }
      }
    });
  };

  const generarGraficoSemanal = () => {
    if (chartSemanaRef.current) {
      chartSemanaRef.current.destroy();
    }
    const ctxSemana = document.getElementById('chart-semana').getContext('2d');
    chartSemanaRef.current = new Chart(ctxSemana, {
      type: 'line',
      data:{
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], // Días de la semana
        datasets: [{
          label: 'Visitas por Semana',
          data: dataSemana, 
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category', // Asegúrate de que el tipo de escala sea 'category'
          },
          y: {
            beginAtZero: true // Comenzar en cero
          }
        }
      }
    });
  };

  const generarGraficoMensual = () => {
    if (chartMesRef.current) {
      chartMesRef.current.destroy();
    }
    const ctxMes = document.getElementById('chart-mes').getContext('2d');
    chartMesRef.current = new Chart(ctxMes, {
      type: 'bar',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Visitas por Mes',
          data: dataMes, 
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category', // Asegúrate de que el tipo de escala sea 'category'
          },
          y: {
            beginAtZero: true // Comenzar en cero
          }
        }
      }
    });
  };

  const descargarPDF = (titulo) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(titulo, 20, 20);
    doc.setFontSize(12);
    doc.text('Este es el reporte generado.', 20, 30);
    doc.save(titulo + '.pdf');
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); // Actualiza la fecha seleccionada
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Marca el día actual
      return date.toDateString() === new Date().toDateString() ? 'highlight' : null;
    }
  };

  return (
    <div>
      <HeaderReportes />
      <div className="App">
        <h1 className="vigilante-title">Generación de Reportes</h1>
        <h2 className="access-check-title">Conjunto Residencial Zafiro La Prosperidad</h2>
        <h3 className="access-check-title">Access Check</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="es-ES"
          firstDayOfWeek={0}
          className="calendar-animation" // Clase para animación
          style={{ width: '250px', height: 'auto ' }} // Estilo para hacer el calendario más pequeño
          tileClassName={tileClassName} // Aplica la clase para marcar el día actual
        />
      </div>
      <div className="reports-container">
        <div className="reports-wrapper">
          <div className="graph-container">
            <div className="visitor-report" id="report-diario">
              <div className="report-card">
                <h2>Reporte de Hoy</h2>
                <canvas id="chart-dia"></canvas>
                <div className="button-container">
                  <button className="ver-mas-button" onClick={() => descargarPDF('Reporte_Diario')}>
                    <i className="fas fa-download"></i> Descargar PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="visitor-report" id="report-semanal">
              <div className="report-card">
                <h2>Reporte Semanal</h2>
                <canvas id="chart-semana"></canvas>
                <div className="button-container">
                  <button className="ver-mas-button" onClick={() => descargarPDF('Reporte_Semanal')}>
                    <i className="fas fa-download"></i> Descargar PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="visitor-report" id="report-mensual">
              <div className="report-card">
                <h2 >Reporte Mensual</h2>
                <canvas id="chart-mes"></canvas>
                <div className="button-container">
                  <button className="ver-mas-button" onClick={() => descargarPDF('Reporte_Mensual')}>
                    <i className="fas fa-download"></i> Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerReportes;