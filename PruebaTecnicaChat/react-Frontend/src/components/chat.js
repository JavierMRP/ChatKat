import React, { Component, useState, useEffect } from "react";
import SockJS from 'sockjs-client'; // Asegúrate de haber instalado 'sockjs-client' usando npm o yarn
import Stomp from 'stompjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton } from '@material-ui/core';
import { ListGroup, ListGroupItem, Image, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Chat(userData) {
  
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('');
    const [role, setRole] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [loading, setLoading] = useState(true);

    const email = userData.userData['userData']['email'];
    const nickname = userData.userData['userData']['nickname'];
    const roleM = userData.userData['userData']['role'];



    useEffect(() => {
        const socket = new SockJS('http://localhost:8084/api/v1/websocket');
        const client = Stomp.over(socket);

        client.connect({}, () => {
        client.subscribe('/topic/messages', (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
        });

        setStompClient(client);

        setSender(nickname);

        setRole(roleM);

        // Precargar los mensajes desde el servidor
        fetch('http://localhost:8084/messages',{
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            setMessages(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            setLoading(false);
        });

        return () => {
        client.disconnect();
        };
    }, []);

 

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        
        if (message.trim()) {
        const chatMessage = {
            role,
            sender,
            content: message,
        };

        stompClient.send('/app/room', {}, JSON.stringify(chatMessage));
        setMessage('');
        }
    };

    

    return (
      
        <div>
        <div style={{"text-align": "center"}}>
        <iframe width='500' height='294' src="https://www.youtube.com/embed/cqMfPS8jPys?&theme=dark&autoplay=1&autohide=2" frameborder="0"></iframe>
        <div><a href='http://codegena.com/generator/Youtube-Embed-Code-Generator.html'>Created by Codegena.</a></div>
        </div>
        {loading ? (
            <Typography variant="subtitle1">Cargando Mensajes ....</Typography>
        ) : (
            <List>
            {messages.length === 0 ? (
                <Typography variant="subtitle1">No se enviado mensajes hasta el momento</Typography>
            ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar>{msg.sender.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant="button">@{msg.sender}</Typography>&nbsp;
                            <Typography variant="caption">{msg.role}</Typography>&nbsp;
                            <Typography variant="overline">{msg.timestamp.slice(0, 10)}</Typography>
                        </div>
                        <div>
                            <Typography variant="body1">{msg.content}</Typography>
                        </div>
                        </div>
                    </ListItemText>
                    </ListItem>
                ))}
                </div>

                </div>
            )}
            <div className="d-flex align-items-center">
            <Form.Control
                placeholder="Escribe un mensaje"
                value={message}
                onChange={handleMessageChange}
                className="mr-2"
            />&nbsp;&nbsp;
            <Button variant="primary" onClick={sendMessage} disabled={!message.trim()}>
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> 
                Enviar
            </Button>
            </div>
            &nbsp;
            </List>
        )}
        </div>
    );
}


