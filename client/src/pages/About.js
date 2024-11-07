import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Sobre Nosotros"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/imagenes/about.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Alfa Design es un negocio en crecimiento dedicado a la venta de artículos artesanales, 
          con un enfoque especial en cuchillos de alta calidad. Nuestro compromiso es ofrecer productos 
          únicos, hechos con dedicación y precisión, manteniendo siempre la esencia de un pequeño 
          emprendimiento que valora la artesanía y la atención al detalle en cada creación.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;