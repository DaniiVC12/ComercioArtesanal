import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contactanos"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/imagenes/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACTANOS</h1>
          <p className="text-justify mt-2">
          En caso de cualquier consulta e información sobre algún producto, no dude en llamar en 
          cualquier momento; estamos para servirle.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.ayuda@AlfaDesignapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (servicio gratuito)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;