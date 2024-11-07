import { useState, useEffect, useContext, createContext } from 'react';
import Layout from './../components/Layout/Layout';
import { useAuth } from '../context/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const[auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if(data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"ALFA DESIGN"}>
        <h1>Inicio</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;








/*import React from 'react';
import Layout from './../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"ALFA DESIGN"}>
        <h1>Inicio</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage; */