Booksy – Frontend Full Stack

Booksy es una plataforma web desarrollada como parte de un proyecto académico, orientada a la gestión y comercialización de libros digitales. El frontend de la aplicación fue desarrollado utilizando React, con el objetivo de ofrecer una interfaz moderna, intuitiva y responsiva, integrada a un backend mediante una API REST.

Tecnologías utilizadas

React (Create React App)

JavaScript (ES6+)

HTML5

CSS3

Node.js y npm

Consumo de API REST

GitHub para control de versiones

Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

Node.js

npm

Puedes verificar la instalación ejecutando:

node -v
npm -v

Instalación y ejecución

En el directorio del proyecto, ejecuta los siguientes comandos:

npm install

Instala todas las dependencias necesarias del proyecto.

npm start

Ejecuta la aplicación en modo desarrollo.
Abre http://localhost:3000
 para visualizarla en el navegador.

La aplicación se recargará automáticamente cuando se realicen cambios en el código.
Los errores de lint se mostrarán en la consola.

##Scripts disponibles
npm test

Inicia el ejecutor de pruebas en modo interactivo de observación.
Consulta la documentación sobre ejecución de pruebas
 para más información.

npm run build

Construye la aplicación para producción en la carpeta build.
Optimiza el rendimiento y genera archivos minimizados listos para despliegue.

npm run eject

Nota: esta es una operación irreversible.

Este comando expone la configuración completa de Create React App (webpack, Babel, ESLint, etc.) para permitir una personalización avanzada del proyecto.

Estructura del proyecto

El proyecto se organiza de la siguiente manera:

src/
 ├── api/               # Llamadas a la API REST
 ├── components/        # Componentes reutilizables
 ├── context/           # Contextos globales (Auth, Carrito)
 ├── pages/              # Vistas principales del sistema
 ├── App.js
 └── index.js

Funcionalidades principales

Autenticación de usuarios (login y rutas protegidas)

Visualización de catálogo de libros

Operaciones CRUD conectadas al backend

Carrito de compras

Descarga de libros adquiridos

Validaciones de formularios en el frontend

Integración con el backend

El frontend se comunica con el backend de Booksy a través de una API REST, enviando y recibiendo datos mediante solicitudes HTTP para la gestión de usuarios, libros y pedidos.

##Aprende más

Este proyecto fue inicializado con Create React App
.

Puedes consultar la documentación oficial de React en:
https://reactjs.org/

Documentación de Create React App:
https://facebook.github.io/create-react-app/docs/getting-started

Autores

Proyecto desarrollado con fines académicos por el equipo Booksy.
Desarrolaldores: Gonzalo Palma, Rodrigo Salaza
