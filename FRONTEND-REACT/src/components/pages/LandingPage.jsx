import { useState } from "react";
import { Link } from "react-router";
import Card from "../create/Card";
import { useEffect } from "react";

function LandingPage() {
  // eslint-disable-next-line no-unused-vars

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "",
      slogan: "",
      repo: "",
      demo: "",
      technologies: "",
      desc: "",
      author: "",
      job: "",
      photo: "",
      image: "",
    },
    {
      id: 2,
      name: "",
      slogan: "",
      repo: "",
      demo: "",
      technologies: "",
      desc: "",
      author: "",
      job: "",
      photo: "",
      image: "",
    },
  ]);

  const getMoviesFromApi = () => {
    console.log("Se están pidiendo las películas de la app");
    // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
    return fetch("//localhost:3000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
        console.log(data);
        
        setProjects(data.projects);
        return data;
      });
  };
  // eslint-disable-next-line no-unused-vars
  const objToExport = {
    getMoviesFromApi: getMoviesFromApi,
  };

  useEffect(() => {
    getMoviesFromApi();
  }, []);

  return (
    <>
      <section className="landing">
        <Link to="/create" className="button--link">
          Crear mi tarjeta
        </Link>
        Listado de proyectos
        {projects.map((project) => (
          <Card key={project.id} changeData={project}></Card>
        ))}
      </section>
    </>
  );
}

export default LandingPage;
