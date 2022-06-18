//Cargando librerias
const { Pool } = require('pg')
const express = require('express')
const { engine } = require('express-handlebars')

const path = require('path')
const app = express()
const port = 3000

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'mercadoweb'
})

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
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

// Accecibilizando la archivos de assets
app.use('/css', express.static(__dirname + '/assets/css'))
app.use('/js', express.static(__dirname + 'assets/js'))
app.use('/img', express.static(__dirname + 'assets/img'))

// Ruta de la pagina inicial
app.get('/', async (req, res) => {
    //const result = await pool.query('SELECT * FROM frutas')
    res.render('index', {
        layout: 'index',
        //frutas: result.rows
    })
})

app.get('/login', async (req, res) => {
    //const result = await pool.query('SELECT * FROM frutas')
    res.render('login', {
        layout: 'login',
        //frutas: result.rows
    })
})

app.get('/registro', async (req, res) => {
    const result = await pool.query('SELECT * FROM frutas')
    res.render('registro', {
        layout: 'registro',
        //frutas: result.rows
    })
})

app.post('/registro', async (req, res) => {
    const course = req.body
    console.log(course)
    res.send(course)
})

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