import React, { Component, useEffect, useState } from "react";
import Chat from "./chat"
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton } from '@material-ui/core';

export default function UserHome( userData ) {

  const email = userData['userData']['email'];
  const nickname = userData['userData']['nickname'];
  const roleM = userData['userData']['role'];

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
    <div className="auth-inner" style={{ width: "auto" }}>
      <h3>Sala de Clase</h3>
        <Chat userData={userData}/>
        <div>
                          
          Username<h1><Typography variant="caption">{nickname}</Typography></h1>
          Email <h1><Typography variant="caption">{email}</Typography></h1>
          Role <h1><Typography variant="caption">{roleM}</Typography></h1>
          <br />
          &emsp;&emsp;
        &emsp;&emsp;
        <div className="d-flex justify-content-center">
        <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}