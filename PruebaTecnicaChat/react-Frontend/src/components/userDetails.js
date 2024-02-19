import React, { useState, useEffect } from 'react';
import AdminHome from './adminHome';
import UserHome from './userHome';

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    fetch("http://localhost:8084/api/v1/user/getUserDetails", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // La solicitud ha terminado, ya no estamos cargando

        if (data.role === "TEACHER") {
          setAdmin(true);
        }

        setUserData(data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del usuario:', error);
        setLoading(false); // La solicitud ha terminado, ya no estamos cargando
      });
  }, []);

  
  if (loading) {
    return <p>Cargando...</p>;
  }

 
  if (!userData) {
    return <p>No se pudieron obtener los detalles del usuario.</p>;
  }

  
  return admin ? <AdminHome userData={userData} /> : <UserHome userData={userData} />;
}
