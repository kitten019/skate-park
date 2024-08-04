import express from 'express'
import { engine } from 'express-handlebars';
import dotenv from 'dotenv/config'
import fileUpload from 'express-fileupload';

import routerUser from './router/skaters.Router.js';

//express
const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware archivos estáticos
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  fileUpload({
    limits: { fileSize: 5000000 }, //5mb
    abortOnLimit: true,
    responseOnLimit: "El peso de la imagen que intentas subir supera el límite permitido",
  })
);

app.use('/', routerUser)

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

const PORT = process.env.PORT
app.listen(PORT, () => console.log('server andando... en el puerto http://localhost:' + PORT))