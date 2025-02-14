import React from 'react';
import { Link } from 'react-router-dom';
import './AcercaDeNosotros.css'; // Asegúrate de que el archivo CSS está bien importado

const AcercaDeNosotros = () => {
    return (
        <div className="acerca-de-nosotros">
            <div className="contenido">
                {/* Información del grupo */}
                <h1>Acerca de Nosotros</h1>

                {/* Imagen del equipo */}
                <div className="imagen-grupo">
                    <img src="fond/Logo.png" alt="Equipo" />
                </div>

                <section className="informacion">
                    <h2>Red Social Nikoly</h2>
                    <p>
                        EduConnect es una plataforma de red social innovadora diseñada exclusivamente para la comunidad académica.
                        Su objetivo principal es facilitar la conexión y el intercambio de ideas entre estudiantes y
                        docentes de diversas universidades. En EduConnect, podrás compartir publicaciones (posts)
                        sobre temas de interés académico, participar en debates constructivos a través de comentarios
                        y mantenerte al día con las últimas tendencias y descubrimientos en tu campo de estudio

                        la seguridad y el profesionalismo son nuestras prioridades. Hemos implementado medidas
                        de seguridad robustas para proteger la información de nuestros usuarios y garantizar un
                        entorno en línea seguro y confiable. Nuestro equipo de moderación se encarga de mantener
                        un ambiente respetuoso y constructivo, donde las ideas pueden ser compartidas y debatidas
                        de manera abierta y profesional
                    </p>
                </section>

                {/* Misión, visión y objetivos */}
                <section className="misison-vision">
                    <h2>Misión</h2>
                    <p>
                        Fomentar un entorno virtual dinámico y seguro donde estudiantes y docentes puedan colaborar,
                        compartir conocimientos y expandir sus horizontes académicos. Buscamos crear una comunidad
                        en línea vibrante que impulse el aprendizaje, la investigación y el desarrollo de nuevas ideas.
                    </p>

                    <h2>Visión</h2>
                    <p>
                        Ser la plataforma de referencia para la comunidad académica global,
                        reconocida por su excelencia en la promoción del intercambio de conocimientos,
                        la colaboración y el debate constructivo. Aspiramos a empoderar a estudiantes y
                        docentes, brindándoles las herramientas necesarias para alcanzar su máximo
                        potencial académico.
                    </p>

                    <h2>Objetivos</h2>
                    <ul>
                        <li>Conectar: Facilitar la creación de redes de contacto entre
                            estudiantes y docentes de diferentes instituciones,
                            fomentando la colaboración y el aprendizaje mutuo..</li>
                        <li>Compartir: Permitir la publicación y el intercambio
                            de contenido académico relevante, como artículos,
                            investigaciones, proyectos y recursos educativos</li>
                        <li>Debatir: Promover la discusión constructiva y el
                            intercambio de ideas a través de comentarios y
                            foros de debate moderados.</li>
                    </ul>
                </section>

                {/* Botón para registrarse */}
                <div className="boton-registrarse">
                    <Link to="/registrarse">
                        <button>¡Únete a Nosotros!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AcercaDeNosotros;
