import { Link } from "react-router";

function LandingPage() {
    return(
        <>
        <h1>Landing</h1>

        <Link  to="/create" className="start_button">
            Crear mi tarjeta
        </Link>
        </>

    );
}

export default LandingPage