# NodeJS-EjercicioNOC
En esta seccion se definiran tareas que se ejecutaran periodicamente.

Es importante crear un archivo .env el cual tenga los siguientes datos:


PORT=
SERVICE=
EMAIL=
KEY=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

Envio de correos:
Configuramos una contraseña de aplicación aquí, debemos tener activada la autenticación de 2 pasos: https://myaccount.google.com/u/1/apppasswords , guardamos la key en el archivo .env y su configuración.
Instalamos nodemailer con npm i nodemailer. (si usamos typescript adicionalmente instalamos npm i --save-dev @types/nodemailer)

Usamos docker compose up para levantar docket y poder conectar la bd