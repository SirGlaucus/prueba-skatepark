//Cargando librerias
const { Pool } = require('pg')
const express = require('express')
const exphbs = require('express-handlebars')
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
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine({ layoutsDir: __dirname + '/src/views' }))


// Accecibilizando las librerias de Boostrap y jQuery
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/js', express.static(__dirname + '/assets/js'))
// Consumir los códigos fuentes de Bootstrap y jQuery a través de rutas o middlewares creados en el servidor. Estas dependencias deben ser instaladas con NPM.

//  Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static('assets/imgs'))

// Ruta de la pagina inicial
app.get('/', async (req, res) => {
    /*const result = await pool.query('SELECT * FROM frutas')
    res.render('dashboard', {
        layout: 'dashboard',
        frutas: result.rows
    })*/
    res.send('Prueba')
})
// Crear una ruta raíz que al ser consultada renderice una vista con un parcial
// “Dashboard” enviándole en el render un arreglo con los nombres de los productos. Se
// recomienda que estos coincidan con las imágenes de cada producto.

// Iniciando el servidor
app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`)
})