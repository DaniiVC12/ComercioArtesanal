import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Politica De Privacidad"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/imagenes/politicas.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>1. Los datos personales recopilados a través de la página web se almacenarán únicamente en el 
             servidor y la base de datos necesarios para su funcionamiento, mejorando la experiencia de 
             usuarios frecuentes</p>
          <p>2. La información de los usuarios se protegerá y se utilizará exclusivamente dentro del sistema, 
             garantizando su seguridad y uso legal.</p>
          <p>3. Los datos se emplearán para identificar perfiles y simplificar la busqueda de productos en Alfa 
             Design dentro del sitio web oficial.</p>
          <p>4. Si un usuario solicita la eliminación de su cuenta, todos sus datos serán borrados del sistema 
             y la base de datos.</p>
          <p>5. La información recopilada no se compartirá con terceros, salvo con quienes estén directamente 
             involucrados en el desarrollo y mantenimiento del sitio web.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;