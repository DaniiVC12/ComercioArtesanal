import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
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

  // Validar el formato del correo electrónico usando una expresión regular
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del formato del correo electrónico
    if (!isValidEmailFormat(email)) {
      toast.error("El formato del correo electrónico no es válido.");
      return;
    }

    // Validación de la contraseña
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          answer,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Error en el registro");
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
              placeholder="Correo Electrónico:"
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
              placeholder="Número de Teléfono:"
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
              placeholder="Dirección:"
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
