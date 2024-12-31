import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Home() {
    return (
        <div className="container d-flex flex-column justify-content-between todo">
            <Header /> 
            <div>
                <Outlet />{/* Contenido dinámico basado en la ruta */}
            </div>    
            <Footer />
        </div>
    );
}