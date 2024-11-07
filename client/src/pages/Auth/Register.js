import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const HUNTER_API_KEY = "b5ff43a3502551a4b2cb75f4850d5e2f7930a5d1"; // Aquí va tu API Key de Hunter.io

  // Función para validar el correo con Hunter API
  const validateEmail = async (email) => {
    try {
      const response = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
        params: {
          email: email,
          api_key: HUNTER_API_KEY,
        },
      });
      return response.data.data.result === "deliverable"; // Verifica si el correo es válido
    } catch (error) {
      console.error("Error al verificar el correo: ", error);
      return false; // Si la API falla, tratamos el correo como inválido
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del correo electrónico
    const isValid = await validateEmail(email);
    if (!isValid) {
      toast.error("El correo electrónico no es válido o no se puede verificar.");
      return;
    }

    // Validación de la contraseña
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal");
    }
  };

  return (
    <Layout title="Registro">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Registrarme</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="inputName"
              placeholder="Nombre:"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="inputEmail"
              placeholder="Correo Electronico:"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="inputPassword"
              placeholder="Contraseña:"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="inputPhone"
              placeholder="Numero de Telefono:"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="inputAddress"
              placeholder="Direccion:"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="inputPet"
              placeholder="Nombre de tu mascota:"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTRARME
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;