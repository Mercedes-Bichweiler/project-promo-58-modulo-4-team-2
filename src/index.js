// Importar la biblioteca de Express
const express = require("express");

// Importar la biblioteca de CORS

const cors = require("cors");

// Importamos mysql2
const mysql2 = require("mysql2/promise");

//const path = require("node:path"); //Esto va arriba del todo, con los otros require

// create and config server
const app = express();

// Configuramos server para que funcione bien como API

app.use(cors());

app.use(express.json({ limit: "25Mb" }));

// init express aplication
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está arrancado: http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("ok!");
});

/*const data = [
  {
    id: 1,
    name: "bat-magotchi",
    slogan: "bienvenido a bat-magotchi",
    repo: "https://github.com/s-minaya/bat-magotchi",
    demo: "https://adalab.es/",
    technologies: "HTML CSS JavaScript",
    desc: "No dejes que tu bat-magotchi muera, para ello puedes darle de comer",
    author: "Sofia Minaya",
    job: "FullStack dev",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-uzogj29HaCj7Sh0GTMTMRNtZt0cPsJSx1g&s",
    image:
      "https://img.freepik.com/vector-premium/pixel-murcielago-8-bits-animales-pixeles-activos-juegos-ilustracion-vectorial_614713-1430.jpg",
  },
  {
    id: 2,
    name: "Harry Potter",
    slogan: "Busca tu personaje favorito",
    repo: "https://github.com/Adalab/modulo-3-evaluacion-final-estherquiros.git",
    demo: "https://beta.adalab.es/modulo-3-evaluacion-final-estherquiros/",
    technologies: "HTML SASS REACT",
    desc: "Encuentra cualquier personaje de la película utilizando filtros",
    author: "Esther Quirós",
    job: "FullStack Dev",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3yuixEjjSDBtSrmGUokMJd4OeD-8D8DSDQ&s",
    image:
      "https://www.ecured.cu/images/thumb/3/3b/Harry_potter_personaje.jpg/430px-Harry_potter_personaje.jpg",
  },
];*/

// ENDPOINTS DEL API
app.get("/api/projects", async (req, res) => {
  console.log("GET /api/projects");
  // 1. Conectamos con la bbdd
  const datosConexion = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0110",
    database: "modulo",
  };

  const conn = await mysql2.createConnection(datosConexion);
  await conn.connect();

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

app.post("/api/project", (req, res) => {
  console.log("POST /api/project");

  // Los datos del body del fetch llegan en la variable req.body:

  console.log(req.body);

  // Comprobamos si en el objeto con los datos llega un nombre.

  // Si no, devolvemos success: false y un código de respuesta de error,

  //   y fin de la función del endpoint (por el return):

  if (req.body.name === undefined || req.body.name === "") {
    return res.status(400).json({ success: false, error: "Falta el nombre" });
  }

  // Comprobamos si en el objeto con los datos llega una descripción.

  // Si no, devolvemos success: false y un código de respuesta de error,

  //   y fin de la función del endpoint (por el return):

  if (req.body.desc === undefined || req.body.desc === "") {
    return res

      .status(400)

      .json({ success: false, error: "Falta la descripción" });
  }

  // Parece que los datos recibidos tienen título y descripción.

  // Almacenamos el objeto recibido en nuestro array de objetos:

  data.push(req.body);

  // Devolvemos como respuesta un success: true.

  res.status(200).json({ success: true });
});

// SERVIDOR DE FICHEROS DINAMICOS

// SERVIDOR DE FICHEROS ESTÁTICOS

//app.use(express.static(path.join(__dirname, "..", "FRONTEND-REACT", "dist"))); // Importante el dist aqui
