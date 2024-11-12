import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GraficoClientes from './GraficoClientes'; // Importa el gráfico aquí

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();

        const interval = setInterval(() => {
            obtenerDatos();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de Clientes</h1>
            <div className="row">
                {clientes.map((cliente) => (
                    <div className="col-md-3 mb-4" key={cliente.id}>
                        <div className="card h-100">
                            <div className="card-header text-center font-weight-bold">
                                Cliente ID: {cliente.id}
                            </div>
                            <div className="card-body">
                                <p><strong>Nombre:</strong> {cliente.nombre}</p>
                                <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                                <p><strong>Sexo:</strong> {cliente.sexo}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Agrega el gráfico aquí */}
            <h2 className="text-center mt-5">Gráfico de IDs de Clientes</h2>
            <GraficoClientes data={clientes} /> {/* Pasa los datos de clientes al gráfico */}
        </div>
    );
};

export default ListaClientes;
