import { Link } from "react-router-dom";

export function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/producto">Productos</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/balance">Balance ETH</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    );
}