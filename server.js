//Cargando librerias
const express = require('express')
const { engine } = require('express-handlebars')
const bodyparser = require('body-parser')
const expressFileUpload = require('express-fileupload')
const path = require('path') // TODO: cambiar rutas por path.

const app = express()
const port = 3000

// Rutas
const getSkatersRouter = require('./src/routes/indexRoutes')
const registroRoutes = require('./src/routes/registroRoutes')
const loginRoutes = require('./src/routes/loginRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const datosRoutes = require('./src/routes/datosRoutes')

//Configuracion del FIleUpload
app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido',
    })
)

// Configuracion del handlebars 
app.engine(
    "handlebars",
    engine({
        layoutsDir: __dirname + "/views",
        //partialsDir: __dirname + "/views/componentes/",
    })
)
app.set("view engine", "handlebars")

// Para poder utilizar el body
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.json());

// Accecibilizando la archivos de assets
app.use(express.static('assets'))

// Ruta de la pagina inicial
app.use('/', getSkatersRouter)

// Ruta para registrarse
app.use('/registro', registroRoutes)

// Ruta para loguearse
app.use('/login', loginRoutes)

app.use('/admin', adminRoutes)

app.use('/datos', datosRoutes)

// Iniciando el servidor
app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`)
})