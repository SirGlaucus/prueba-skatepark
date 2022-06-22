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

// Accecibilizando la archivos de assets
app.use(express.static('assets'))

// Ruta de la pagina inicial
app.use('/', getSkatersRouter)

// Ruta para registrarse
app.use('/registro', registroRoutes)

// Ruta para loguearse
app.use('/login', loginRoutes)


app.get('/admin', async (req, res) => {
    //const result = await pool.query('SELECT * FROM frutas')
    res.render('admin', {
        layout: 'admin',
        //frutas: result.rows
    })
})

app.get('/datos', async (req, res) => {
    //const result = await pool.query('SELECT * FROM frutas')
    res.render('datos', {
        layout: 'datos',
        //frutas: result.rows
    })
})

// Iniciando el servidor
app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`)
})