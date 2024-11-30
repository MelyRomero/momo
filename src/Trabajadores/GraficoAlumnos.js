import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        // Función para obtener los datos de la API
        const obtenerAlumnos = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
                const data = await response.json();
                setAlumnos(data);
            } catch (error) {
                console.error("Error al obtener los datos de los alumnos:", error);
            }
        };

        obtenerAlumnos();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Calificaciones de los Alumnos</h2>
            <div className="row">
                {alumnos.map((alumno) => {
                    const practicas = alumno.practicas;
                    const promedio = (
                        (parseInt(practicas.practica_hilos) +
                            parseInt(practicas.practica_socket) +
                            parseInt(practicas.practica_node) +
                            parseInt(practicas.practica_react) +
                            parseInt(practicas.practica_git)) / 5
                    ).toFixed(2);

                    const data = {
                        labels: ['Hilos', 'Socket', 'Node', 'React', 'Git'],
                        datasets: [
                            {
                                label: 'Calificaciones',
                                data: [
                                    practicas.practica_hilos,
                                    practicas.practica_socket,
                                    practicas.practica_node,
                                    practicas.practica_react,
                                    practicas.practica_git,
                                ],
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                        ],
                    };

                    const options = {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `Calificaciones de ${alumno.nombre} (Promedio: ${promedio})`,
                            },
                        },
                    };

                    return (
                        <div className="col-md-6 mb-4" key={alumno.id}>
                            <div className="card h-100">
                                <div className="card-header text-center font-weight-bold">
                                    {alumno.nombre}
                                </div>
                                <div className="card-body">
                                    <Bar data={data} options={options} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GraficoAlumnos;
