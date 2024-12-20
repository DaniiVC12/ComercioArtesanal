import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    console.log("Auth State: ", auth); // Agrega este log
    const authCheck = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/auth/user-auth", {
            headers: { Authorization: `Bearer ${auth?.token}` }
        });
        if (res.data.ok) {
            setOk(true);
        } else {
            setOk(false);
        }
    };

    if (auth?.token) {
        authCheck();
    }
}, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}


/*
export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
          const res = await axios.get("http://localhost:5000/api/v1/auth/user-auth");
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        };
        if (auth?.token) authCheck();
      }, [auth?.token]);

      return ok ? <Outlet /> : <Spinner />;
    }

    */