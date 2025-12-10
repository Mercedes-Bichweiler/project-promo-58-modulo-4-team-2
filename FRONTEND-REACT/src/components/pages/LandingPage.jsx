import { useState } from "react";
import { Link } from "react-router";
import Card from "../create/Card";

function LandingPage() {
    const [projects, setProjects] = useState([{
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

    }])
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