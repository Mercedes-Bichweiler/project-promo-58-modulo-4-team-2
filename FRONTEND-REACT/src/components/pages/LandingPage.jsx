import { Link } from "react-router";

function LandingPage() {
    return(
        <>
        <section className="landing">

        <Link  to="/create" className="button--link">
            Crear mi tarjeta
        </Link>
        </section>
        </>

    );
}

export default LandingPage;