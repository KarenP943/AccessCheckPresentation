const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "access_check"
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});








//registro residente
app.post("/create", (req, res) => {
  const {
    tipoDocumento,
    nombres,
    apellidos,
    numDoc,
    telefono,
    torre,
    apartamento,
    correo,
    contrasenia,
    vehiculo,
    tipoVehiculo,
    placa,
    modelo,
    marca,
    color
  } = req.body;

    console.log("Contraseña a cifrar:", contrasenia);

    if (typeof contrasenia !== 'string' || contrasenia.trim() === '') {
        return res.status(400).send("La contraseña debe ser una cadena no vacía");
    }

    // Establecer el rol por defecto como 'Residente'
    const rol = 'Residente';

    bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
        console.error("Error al cifrar la contraseña:", err);
        return res.status(500).send("Error al registrar el usuario");
      }

        // Continúa con la inserción en la base de datos
        db.query('INSERT INTO Usuario (tipoDocumento, rol, nombres, apellidos, numDoc, telefono, torre, apartamento, correo, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
          [tipoDocumento, 'Residente', nombres, apellidos, numDoc, telefono, torre, apartamento, correo, hash], 
          (err, result) => {
            if (err) {
              console.error("Error al registrar el usuario:", err);
              return res.status(500).send("Error al registrar el usuario");
            }
            
            const usuarioId = result.insertId;
            
            if (vehiculo === 'Si') {
                db.query('INSERT INTO Vehiculo (tipoVehiculo, placa, modelo, color, marca, usuarioId) VALUES (?, ?, ?, ?, ?, ?)', 
                    [tipoVehiculo, placa, modelo, color, marca, usuarioId], 
                    (err) => {
                        if (err) {
                            console.error("Error al registrar el vehículo:", err);
                            return res.status(500).send("Error al registrar el vehículo");
                        }
                        res.send("Usuario y vehículo registrados con éxito");
                    }
                );
            } else {
                res.send("Usuario registrado sin vehículo");
            }
          }
        );
    });
});





// Agregar agendamiento
app.post("/agendamiento", (req, res) => {
    const {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        numPersonas,
        nombres,
        apellidos,
        tipoDocumento,
        numDoc,
        telefono,
        torre,
        apartamento,
        vehiculo,
        tipoVehiculo,
        placa,
        modelo,
        color,
        marca
    } = req.body;

    // Validar los datos recibidos
    if (!fechaInicio || !fechaFin || !horaInicio || !horaFin || !numPersonas || !nombres || !apellidos || !tipoDocumento || !numDoc || !telefono || !torre || !apartamento) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Validar el campo marca para bicicletas
    if (vehiculo === 'Si' && tipoVehiculo === 'Bicicleta' && !marca) {
        return res.status(400).send("El campo marca es obligatorio para bicicletas.");
    }

    // Insertar en la tabla visitante
    const visitanteQuery = `
        INSERT INTO visitante (nombres, apellidos, tipoDocumento, numDoc, telefono)
        VALUES (?, ?, ?, ?, ?)`;

    const visitanteValues = [nombres, apellidos, tipoDocumento, numDoc, telefono];

    db.query(visitanteQuery, visitanteValues, (err, result) => {
        if (err) {
            console.error("Error al registrar el visitante:", err);
            return res.status(500).send("Error al registrar el visitante");
        }

        const visitanteId = result.insertId; // Obtener el ID del visitante registrado

        // Insertar torre y apartamento en la tabla usuario
        const usuarioQuery = `
            INSERT INTO usuario (torre, apartamento)
            VALUES (?, ?)`;

        const usuarioValues = [torre, apartamento];

        db.query(usuarioQuery, usuarioValues, (err, result) => {
            if (err) {
                console.error("Error al registrar el usuario:", err);
                return res.status(500).send("Error al registrar el usuario");
            }

            const usuarioId = result.insertId; // Obtener el ID del usuario registrado

            // Si hay vehículo, insertar en la tabla vehiculo
            let vehiculoId = null; // Inicializar vehiculoId como null

            if (vehiculo === 'Si') {
                let vehiculoQuery;
                let vehiculoValues;

                if (tipoVehiculo === 'Bicicleta') {
                    // Para bicicletas, solo insertar marca y color
                    vehiculoQuery = `
                        INSERT INTO vehiculo (tipoVehiculo, placa, modelo, color, marca)
                        VALUES (?, ?, ?, ?, ?)`;

                    vehiculoValues = [tipoVehiculo, null, null, color, marca]; // placa y modelo como NULL
                } else {
                    // Para automóviles y motocicletas, insertar placa, modelo, color y marca
                    vehiculoQuery = `
                        INSERT INTO vehiculo (tipoVehiculo, placa, modelo, color, marca)
                        VALUES (?, ?, ?, ?, ?)`;

                    vehiculoValues = [tipoVehiculo, placa, modelo, color, marca]; // marca se incluye
                }

                db.query(vehiculoQuery, vehiculoValues, (err, result) => {
                    if (err) {
                        console.error("Error al registrar el vehículo:", err);
                        return res.status(500).send("Error al registrar el vehículo");
                    }

                    vehiculoId = result.insertId; // Obtener el ID del vehículo registrado
                    // Ahora que tenemos el vehiculoId, podemos continuar con el agendamiento
                    insertAgendamiento();
                });
            } else {
                // Si no hay vehículo, continuar con el agendamiento
                insertAgendamiento();
            }

            // Función para insertar en agendamientoentrada
            function insertAgendamiento() {
                let agendamientoQuery;
                let agendamientoValues;

                if (vehiculo === 'Si') {
                    agendamientoQuery = `
                        INSERT INTO agendamientoentrada (fechaInicio, fechaFin, horaInicio, horaFin, numPersonas, visitanteId, vehiculoId, usuarioId)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                    agendamientoValues = [
                        fechaInicio,
                        fechaFin,
                        horaInicio,
                        horaFin,
                        numPersonas,
                        visitanteId,
                        vehiculoId, // Incluir vehiculoId
                        usuarioId
                    ];
                } else {
                    agendamientoQuery = `
 INSERT INTO agendamientoentrada (fechaInicio, fechaFin, horaInicio, horaFin, numPersonas, visitanteId, usuarioId)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

                    agendamientoValues = [
                        fechaInicio,
                        fechaFin,
                        horaInicio,
                        horaFin,
                        numPersonas,
                        visitanteId,
                        usuarioId // No incluir vehiculoId
                    ];
                }

                db.query(agendamientoQuery, agendamientoValues, (err) => {
                    if (err) {
                        console.error("Error al registrar el agendamiento:", err);
                        return res.status(500).send("Error al registrar el agendamiento");
                    }

                    // Enviar mensaje de éxito después de registrar el agendamiento
                    res.status(200).send("Agendamiento, visitante y vehículo registrados con éxito");
                });
            }
        });
    });
});

app.post("/agendamiento/sorpresa", (req, res) => {
    const {
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        numPersonas,
        nombres,
        apellidos,
        tipoDocumento,
        numDoc,
        telefono,
        torre,
        apartamento,
        vehiculo,
        tipoVehiculo,
        placa,
        modelo,
        color,
        marca
    } = req.body;

    // Validar los datos recibidos
    if (!fechaInicio || !fechaFin || !horaInicio || !horaFin || !numPersonas || !nombres || !apellidos || !tipoDocumento || !numDoc || !telefono || !torre || !apartamento) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Validar el campo marca para bicicletas
    if (vehiculo === 'Si' && tipoVehiculo === 'Bicicleta' && !marca) {
        return res.status(400).send("El campo marca es obligatorio para bicicletas.");
    }

    // Insertar en la tabla visitante
    const visitanteQuery = `
        INSERT INTO visitante (nombres, apellidos, tipoDocumento, numDoc, telefono)
        VALUES (?, ?, ?, ?, ?)`;

    const visitanteValues = [nombres, apellidos, tipoDocumento, numDoc, telefono];

    db.query(visitanteQuery, visitanteValues, (err, result) => {
        if (err) {
            console.error("Error al registrar el visitante:", err);
            return res.status(500).send("Error al registrar el visitante");
        }

        const visitanteId = result.insertId; // Obtener el ID del visitante registrado

        // Insertar torre y apartamento en la tabla usuario
        const usuarioQuery = `
            INSERT INTO usuario (torre, apartamento)
            VALUES (?, ?)`;

        const usuarioValues = [torre, apartamento];

        db.query(usuarioQuery, usuarioValues, (err, result) => {
            if (err) {
                console.error("Error al registrar el usuario:", err);
                return res.status(500).send("Error al registrar el usuario");
            }

            const usuarioId = result.insertId; // Obtener el ID del usuario registrado

            // Si hay vehículo, insertar en la tabla vehiculo
            let vehiculoId = null; // Inicializar vehiculoId como null

            if (vehiculo === 'Si') {
                let vehiculoQuery;
                let vehiculoValues;

                if (tipoVehiculo === 'Bicicleta') {
                    // Para bicicletas, solo insertar marca y color
                    vehiculoQuery = `
                        INSERT INTO vehiculo (tipoVehiculo, placa, modelo, color, marca)
                        VALUES (?, ?, ?, ?, ?)`;

                    vehiculoValues = [tipoVehiculo, null, null, color, marca]; // placa y modelo como NULL
                } else {
                    // Para automóviles y motocicletas, insertar placa, modelo, color y marca
                    vehiculoQuery = `
                        INSERT INTO vehiculo (tipoVehiculo, placa, modelo, color, marca)
                        VALUES (?, ?, ?, ?, ?)`;

                    vehiculoValues = [tipoVehiculo, placa, modelo, color, marca]; // marca se incluye
                }

                db.query(vehiculoQuery, vehiculoValues, (err, result) => {
                    if (err) {
                        console.error("Error al registrar el vehículo:", err);
                        return res.status(500).send("Error al registrar el vehículo");
                    }

                    vehiculoId = result.insertId; // Obtener el ID del vehículo registrado
                    // Ahora que tenemos el vehiculoId, podemos continuar con el agendamiento
                    insertAgendamiento();
                });
            } else {
                // Si no hay vehículo, continuar directamente con el agendamiento
                insertAgendamiento();
            }

            function insertAgendamiento() {
                // Insertar en la tabla agendamiento
                const agendamientoQuery = `
                    INSERT INTO agendamientoentrada (fechaInicio, fechaFin, horaInicio, horaFin, numPersonas, estado, visitanteId, usuarioId, vehiculoId)
                    VALUES (?, ?, ?, ?, ?, 'Activo', ?, ?, ?)`;

                const agendamientoValues = [fechaInicio, fechaFin, horaInicio, horaFin, numPersonas, visitanteId, usuarioId, vehiculoId];

                db.query(agendamientoQuery, agendamientoValues, (err, result) => {
                    if (err) {
                        console.error("Error al registrar el agendamiento:", err);
                        return res.status(500).send("Error al registrar el agendamiento");
                    }

                    res.status(201).send("Agendamiento registrado con éxito.");
                });
            }
        });
    });
});
//crear un vigilante
app.post("/crear", (req, res) => {
  const {
      tipoDocumento,
      nombres,
      apellidos,
      numDoc,
      telefono,
      correo,
      contrasenia // Asegúrate de que esto sea un string
  } = req.body;

  console.log("Contraseña a cifrar:", contrasenia);

  if (typeof contrasenia !== 'string' || contrasenia.trim() === '') {
      return res.status(400).send("La contraseña debe ser una cadena no vacía");
  }

  // Cambiamos el rol por defecto a 'Vigilante'
  const rol = 'Vigilante';

  bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
          console.error("Error al cifrar la contraseña:", err);
          return res.status(500).send("Error al registrar el vigilante");
      }

      // Continúa con la inserción en la base de datos, eliminando torre y apartamento
      db.query('INSERT INTO Usuario (tipoDocumento, rol, nombres, apellidos, numDoc, telefono, correo, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
          [tipoDocumento, rol, nombres, apellidos, numDoc, telefono, correo, hash], 
          (err, result) => {
              if (err) {
                  console.error("Error al registrar el vigilante:", err);
                  return res.status(500).send("Error al registrar el vigilante");
              }
              
              res.send("Vigilante registrado con éxito");
      });
  });
});

app.get("/Usuario", (req, res) => {
    const query = `
        SELECT U.*, V.tipoVehiculo, V.placa, V.modelo, V.color, V.marca
        FROM Usuario U
        LEFT JOIN Vehiculo V ON U.idUsuario = V.usuarioId
    `;
    
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).send("Error al obtener usuarios");
        }
        res.send(result);
    });
});

app.put("/update", (req, res) => {
    const {
        idUsuario,
        tipoDocumento,
        nombres,
        apellidos,
        numDoc,
        telefono,
        torre,
        apartamento,
        correo,
        contrasenia,
        vehiculo,
        tipoVehiculo,
        placa,
        modelo,
        color
    } = req.body;

    // Definir una función para actualizar el usuario
    const updateUser  = (hash) => {
        db.query('UPDATE Usuario SET tipoDocumento=?, nombres=?, apellidos=?, numDoc=?, telefono=?, torre=?, apartamento=?, correo=?, contrasenia=? WHERE idUsuario=?', 
            [tipoDocumento, nombres, apellidos, numDoc, telefono, torre, apartamento, correo, hash, idUsuario], 
            (err) => {
                if (err) {
                    console.error("Error al actualizar el usuario:", err);
                    return res.status(500).send("Error al actualizar el usuario");
                }

                // Actualizar información del vehículo si es aplicable
                if (vehiculo === 'Si') {
                    db.query('INSERT INTO Vehiculo (tipoVehiculo, placa, modelo, color, usuarioId) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE tipoVehiculo=?, placa=?, modelo=?, color=?',
                        [tipoVehiculo, placa, modelo, color, idUsuario, tipoVehiculo, placa, modelo, color],
                        (err) => {
                            if (err) {
                                console.error("Error al actualizar el vehículo:", err);
                                return res.status(500).send("Error al actualizar el vehículo");
                            }
                            res.send("Usuario y vehículo actualizados con éxito");
                        }
                    );
                } else {
                    // Si no hay vehículo, eliminarlo de la base de datos
                    db.query('DELETE FROM Vehiculo WHERE usuarioId = ?', [idUsuario], (err) => {
                        if (err) {
                            console.error("Error al eliminar el vehículo:", err);
                            return res.status(500).send("Error al eliminar el vehículo");
                        }
                        res.send("Usuario actualizado sin vehículo");
                    });
                }
            });
    };

    // Comprobar si se proporciona la contraseña
    if (contrasenia && contrasenia.trim() !== '') {
        bcrypt.hash(contrasenia, 10, (err, hash) => {
            if (err) {
                console.error("Error al cifrar la contraseña:", err);
                return res.status(500).send("Error al actualizar el usuario");
            }
            updateUser (hash); // Actualizar usuario con la contraseña cifrada
        });
    } else {
        // Si no hay nueva contraseña, actualizar sin cambiar la contraseña
        updateUser (null); // Pasar null para indicar que no hay cambio de contraseña
    }
});




// Ruta para obtener usuarios Por torres
app.get('/TorreAPiso1', (req, res) => {
    const { torre, apartamento } = req.query;

    let query = 'SELECT * FROM usuario WHERE 1=1';
    const params = [];
  
    if (torre) {
      query += ' AND torre = ?';
      params.push(torre);
    }
  
    if (apartamento) {
      query += ' AND apartamento = ?';
      params.push(apartamento);
    }
  
    db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });
  


app.get("/veragendamientos", async (req, res) => {
    const query = `
        SELECT 
            ae.idAgendamiento,
            ae.fechaInicio,
            ae.fechaFin,
            ae.horaInicio,
            ae.horaFin,
            ae.numPersonas,
            ae.estado,
            u.nombres AS nombreUsuario,
            u.nombres AS nombreUsuario,
            vi.apellidos,
            u.torre AS torre,
            u.apartamento AS apartamento,
            ve.tipoVehiculo AS tipoVehiculo,
            ve.placa AS placaVehiculo,
            vi.nombres AS nombreVisitante,
            vi.telefono AS telefono,
            vi.tipoDocumento ,
            vi.numDoc 
        FROM 
            agendamientoentrada ae 
        JOIN
            usuario u ON ae.usuarioId = u.idUsuario 
        JOIN 
            visitante vi ON ae.visitanteId = vi.idVisitante 
        JOIN 
            vehiculo ve ON ae.vehiculoId = ve.idVehiculo;
    
    `;


    // Ejecutar la consulta
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(results); // Enviar los resultados al cliente
    });
});


  
  app.listen(3001, () => {
      console.log("Corriendo en el puerto 3001");
  });















