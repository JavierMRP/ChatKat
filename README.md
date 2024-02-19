# ChatKat
 RealTime Chat For Streaming Class

https://github.com/JavierMRP/ChatKat/assets/87096457/4ef07ad7-76b5-4a29-bb48-6795aa35bfc5

# Descripción del Proyecto

Este proyecto consiste en el desarrollo de una aplicación fullstack para clases de streaming online, utilizando tecnologías modernas y aplicando medidas de seguridad robustas tanto en el frontend como en el backend. La aplicación permite a los usuarios registrarse, autenticarse y participar en clases en tiempo real, incluyendo la funcionalidad de chat en tiempo real.

## Tecnologías Utilizadas

- **Frontend**: Se utilizó ReactJS para la interfaz de usuario, garantizando una experiencia de usuario dinámica y receptiva.
- **Backend**: Se implementó con Spring Boot, lo que proporciona un servidor Java robusto y escalable para manejar la lógica del negocio y la comunicación con la base de datos.
- **Base de Datos**: Se empleó MySQL para almacenar la información de usuarios, clases, mensajes de chat, entre otros.
- **Autenticación y Autorización**: Se implementó un sistema de autenticación basado en JSON Web Tokens (JWT), lo que garantiza un proceso seguro de inicio de sesión y autorización de acciones para los usuarios.
- **Seguridad**: Se aplicaron medidas de seguridad como la encriptación de contraseñas tanto en el frontend como en el backend, asegurando la confidencialidad de la información del usuario.
- **Chat en Tiempo Real**: Se desarrolló un sistema de chat en tiempo real utilizando WebSockets, lo que permite a los usuarios comunicarse de manera instantánea durante las clases.
- **Control de Acceso**: Se establecieron roles de usuario, permitiendo asignar privilegios especiales como convertir estudiantes en moderadores para ciertas clases.

## Funcionalidades Principales

1. **Registro de Usuarios**: Los usuarios pueden registrarse en la plataforma proporcionando información básica.
2. **Inicio de Sesión Seguro**: Los usuarios pueden iniciar sesión de forma segura utilizando su correo electrónico y contraseña.
3. **Autenticación con JWT**: Se genera un token JWT después de la autenticación del usuario, que se utiliza para autorizar las solicitudes subsiguientes.
4. **Clases de Streaming**: Los usuarios pueden unirse a clases en tiempo real y participar en discusiones.
5. **Chat en Tiempo Real**: Se proporciona un chat en tiempo real dentro de las clases, facilitando la comunicación entre estudiantes y moderadores.
6. **Gestión de Usuarios**: Los moderadores pueden convertir estudiantes en moderadores, gestionar permisos y realizar otras acciones administrativas.
7. **Seguridad de Contraseñas**: Las contraseñas de los usuarios se almacenan de forma segura mediante técnicas de encriptación.
8. **Control de Acceso Granular**: Se aplican restricciones de acceso según los roles de usuario, garantizando que solo los usuarios autorizados puedan realizar ciertas acciones.

## Instalación y Ejecución

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del frontend y backend utilizando npm y Maven respectivamente.
3. Configura la base de datos MySQL y asegúrate de actualizar la configuración en el backend.
4. Ejecuta el backend utilizando Maven y el frontend utilizando npm start.
5. La aplicación estará disponible en http://localhost:3000.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, no dudes en enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

¡Gracias por tu interés en este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto.



 # JWT Tokens for autenticaion
 ![spring-security-refresh-token-jwt-spring-boot-flow](https://github.com/JavierMRP/ChatKat/assets/87096457/faa99a64-152e-47c2-99fe-d1520c2a2587)



