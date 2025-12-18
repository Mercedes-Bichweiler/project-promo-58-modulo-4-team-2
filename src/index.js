// Importar la biblioteca de Express
const express = require("express");

// Importar la biblioteca de CORS

const cors = require("cors");
const path = require("node:path");

// Importamos dotenv
require("dotenv").config();

// Importamos mysql2
const mysql2 = require("mysql2/promise");

//const path = require("node:path"); //Esto va arriba del todo, con los otros require

// create and config server
const app = express();

// Configuramos server para que funcione bien como API

app.use(cors());

app.use(express.json({ limit: "25Mb" }));

const getConnection = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "pass",
    database: process.env.MYSQL_SCHEMA || "modulo",
  };
  const conn = await mysql2.createConnection(datosConexion); // Crear la cajita de la conexión en el Workbench
  await conn.connect(); // Hacer click en la cajita de la conex del Workbench
  return conn;
};

// init express aplication
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está arrancado: http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("ok!");
});

// ENDPOINTS DEL API
app.get("/api/projects", async (req, res) => {
  console.log("GET /api/projects");
  // 1. Conectamos con la bbdd
  const conn = await getConnection();

  // 2. Preparamos una query = SELECT
  const querySelectProjects = `SELECT *
FROM modulo.proyectos
LEFT JOIN modulo.autor
  ON modulo.autor.id = modulo.proyectos.autor_id;
  `;

  // 3. Lanzamos la query
  const [resultados] = await conn.query(querySelectProjects);
  console.log(resultados);

  // 4. Cerramos la conexión

  await conn.end();

  // 5. Responder con los datos

  res.json({
    success: true,
    projects: resultados,
  });
});

app.post("/api/project", async (req, res) => {
  console.log("POST /api/project");

  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      error: "Falta el nombre",
    });
  }

  if (!req.body.desc) {
    return res.status(400).json({
      success: false,
      error: "Falta la descripción",
    });
  }

  const conn = await getConnection();

  try {
    const insertAuthor = `
      INSERT INTO autor (author, job, photo)
      VALUES (?, ?, ?);
    `;

    const [resultInsertAuthor] = await conn.execute(insertAuthor, [
      req.body.author,
      req.body.job,
      req.body.photo,
    ]);

    const insertProject = `
      INSERT INTO proyectos 
      (name, slogan, repo, demo, technologies, \`desc\`, image, autor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [resultInsertProject] = await conn.execute(insertProject, [
      req.body.name,
      req.body.slogan,
      req.body.repo,
      req.body.demo,
      req.body.technologies,
      req.body.desc,
      req.body.image,
      resultInsertAuthor.insertId,
    ]);

    await conn.end();

    res.json({
      success: true,
      cardURL: `http://localhost:3000/project/${resultInsertProject.insertId}`,
    });
  } catch (error) {
    console.error(error);

    await conn.end();

    res.status(500).json({
      success: false,
      error: "Error en la base de datos",
    });
  }
});

// SERVIDOR DE FICHEROS DINAMICOS

// SERVIDOR DE FICHEROS ESTÁTICOS

//app.use(express.static(path.join(__dirname, "..", "FRONTEND-REACT", "dist"))); // Importante el dist aqui
