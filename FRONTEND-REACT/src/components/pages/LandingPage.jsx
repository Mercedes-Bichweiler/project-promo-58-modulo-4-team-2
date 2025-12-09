import { Link } from "react-router";

function LandingPage() {
    return(
        <>

        <Link  to="/create" className="button--link">
            Crear mi tarjeta
        </Link>
        </>

    );
}

export default LandingPage