# Proyecto : Skate Park

## Instalación del Proyecto

1. Posicionarse en directorio raíz del proyecto en una terminal git bash e instalar dependencias npm con el comando 
npm install bcryptjs dotenv express express-fileupload express-handlebars jsonwebtoken pg

## Instrucciones para Cargar los Datos Semilla a la Base de Datos

1. Crear una base de datos en PostgreSQL llamada skatepark y ejecutar en ella el archivo skatepark.sql, el cual se encuentra en la carpeta data de este proyecto. En caso de no encontrar este archivo el script para crear dicho archivo se encuentra a continuación: 

```bash

DROP TABLE IF EXISTS SKATERS;

CREATE TABLE skaters (
	id SERIAL,
	email VARCHAR(50) NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	password VARCHAR(100) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL,
	role_id INT NOT NULL
);

INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado,role_id) VALUES
('admin@admin.com', 'admin', '123456', 5, 'Saltos', '/assets/img/admin.jpg', TRUE,1);

select * from skaters;

```

## Instrucciones para Ejecutar el Proyecto

1. Utilice el comando node index.js 

## Credenciales de Acceso

### Para Usuario Tipo Administrador

- Email: admin@admin.com
- Contraseña: 123456

