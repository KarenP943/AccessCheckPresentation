import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener todos los residentes
export const obtenerResidentes = async () => {
  try {
    const response = await Api.get('/residentes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los residentes:', error.message);
    throw new Error('Error al obtener los residentes. Inténtalo de nuevo más tarde.');
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    // Obtener todos los residentes
    const residentes = await obtenerResidentes();

    // Verificar si el número de documento ya existe
    const documentoExiste = residentes.some(residente => residente.numdoc === parseInt(userData.numdoc, 10));

    if (documentoExiste) {
      throw new Error('El número de documento ya está registrado.');
    }

    // Asegúrate de que el número de documento sea un entero
    const datosConNumeroDocumento = {
      ...userData,
      numdoc: parseInt(userData.numdoc, 10), // Convertir a entero
    };

    // Registrar el nuevo usuario
    const response = await Api.post('/residentes', datosConNumeroDocumento);
    return response.data;
  } catch (error) {
    console.error('Error al intentar registrar el usuario:', error.message);
    throw new Error('Error al intentar registrar el usuario. Inténtalo de nuevo más tarde.');
  }
};

// Función para autenticar a un residente
export const loginResidente = async (numdoc, contrasenia) => {
  try {
    const response = await Api.get('/residentes');
    const residentes = response.data;

    const residente = residentes.find(r => r.numdoc === parseInt(numdoc, 10) && r.contrasenia === contrasenia);

    if (residente) {
      return residente;
    } else {
      throw new Error('Credenciales inválidas. Por favor, verifica tu número de documento y contraseña.');
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión como residente:', error.message);
    throw new Error('Error al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
  }
};

// Función para autenticar a un funcionario (vigilante)
export const loginFuncionario = async (numdoc, contrasenia) => {
  try {
    const response = await Api.get('/vigilante'); // Endpoint correcto para vigilantes
    const funcionarios = response.data;

    // Asegúrate de convertir numdoc a entero
    const funcionario = funcionarios.find(f => f.numdoc === parseInt(numdoc, 10) && f.contrasenia === contrasenia);

    if (funcionario) {
      return funcionario;
    } else {
      throw new Error('Credenciales inválidas. Por favor, verifica tu número de documento y contraseña.');
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión como funcionario:', error.message);
    throw new Error('Error al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
  }
};


// Función para autenticar a un administrador
export const loginAdmin = async (numdoc, contrasenia) => {
  try {
    const response = await Api.post('/administrador/login', { numdoc, contrasenia });
    return response.data;
  } catch (error) {
    console.error('Error al intentar iniciar sesión como administrador:', error.message);
    throw new Error('Error al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
  }
};

export default Api;
