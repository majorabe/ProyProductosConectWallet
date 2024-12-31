// Importa Axios (para solicitudes HTTP) y useQuery (para solicitudes de datos asincrónicos)
import axios from "axios"; 
import { useQuery } from "react-query"; 

// Función para obtener productos desde el servidor por solicitud GET
function getProductos() {
    return axios.get("http://localhost:8080/sql?sql=SELECT%20*%20FROM%20products%20ORDER%20BY%20product_name%20asc");
}

// Componente React que muestra los productos en una tabla
export function Producto() {
    
    // Usa useQuery para obtener los productos
    const { isLoading, error, data: productos } = useQuery(
        ["productos"], // Identificador único para la consulta
        getProductos   // Función que realiza la solicitud HTTP
    );

    if (isLoading) { 
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los productos: {error.message}</div>;
    }

    // Renderiza una tabla con los datos de los productos
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th> 
                    <th>Nombre</th> 
                    <th>Precio</th> 
                </tr>
            </thead>
            <tbody>
                {/* Recorre los productos y genera filas de la tabla segun la consulta a la BD */}
                {productos.data.map(producto => (
                    <tr key={producto.product_id}> {/* La clave debe ser única para cada fila */}
                        <td>{producto.product_id}</td> 
                        <td>{producto.product_name}</td> 
                        <td>{producto.unit_price}</td> 
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
