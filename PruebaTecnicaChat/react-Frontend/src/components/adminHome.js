import React, { Component, useEffect, useState } from "react";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from 'react-paginate';
import { useRef } from "react";
import Chat from "./chat";
import '../index.css'; // Importa tu archivo de estilos CSS

export default function AdminHome( userData ) {
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(20);
  const [pageCount,setPageCount]=useState(0);
  const currentPage=useRef(0);



  useEffect(() => {
    currentPage.current=0;
    getPaginatedUsers();
  }, []);


  const getAllUser = () => {
    fetch("http://localhost:8084/api/v1/teacher/users", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.content);
      });
  };


  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

 
 
  function changeRole(nickname)  {
    if (window.confirm(`Estas seguro de que quieres cambiar el rol del usuario ${nickname}`)) {
      fetch("http://localhost:8084/api/v1/teacher/changeRole", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: nickname,
        }),
      })
      .then((res) => res.json())
        .then((data) => {
          alert("Rol Actualizado Correctamente");
          getPaginatedUsers();
        });
      
      
      
    } else {

    }
  };

  function handlePageClick(e) {
    console.log(e);
    currentPage.current=e.selected+1;
    getPaginatedUsers();
   

  }
  function changeLimit(){
    currentPage.current=0;
    getPaginatedUsers();
  }

  function getPaginatedUsers(){
    fetch(`http://localhost:8084/api/v1/teacher/users?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.totalPages);
        setData(data.content)
      });
  }

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Sala de Clase</h3>
        <Chat userData={userData} />
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre de Usuario</th>
              <th scope="col">Correo Electrónico</th>
              <th scope="col">Tipo de usuario</th>
              <th scope="col">Moderador</th>
            </tr>
          </thead>
          {data.map((i) => {
            return (
              <tr>
              <td className="text-center">{i.nickname}</td>
              <td className="text-center">{i.email}</td>
              <td className="text-center">{i.role}</td>
              <td className="text-center">
              <button className="btn btn-sm btn-outline-primary" onClick={() => changeRole(i.nickname)}>
                <FontAwesomeIcon icon={faWrench} />
              </button>
              </td>
            </tr>
            );
          })}
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="siguiente ->"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<- anterior"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
        &emsp;&emsp;
        &emsp;&emsp;
        <div className="d-flex justify-content-center">
        <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>
        </div>
      </div>
    </div>
  );
}
