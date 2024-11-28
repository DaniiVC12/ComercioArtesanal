import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        console.log("Auth Token:", auth?.token);  // Verifica el valor del token
        const authCheck = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/auth/admin-auth");
                console.log(res.data); // Verifica la respuesta del servidor
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        if (auth?.token) {
            authCheck();
        } else {
            console.log("No token found"); // Si no hay token, muestra este mensaje
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
    }