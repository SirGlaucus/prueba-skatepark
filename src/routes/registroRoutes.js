const express = require('express')
const { createSkater } = require('../models/skatersSql')
const expressFileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const router = express.Router()

//Configuracion del FIleUpload
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido',
})
)


router.get('/', async (req, res) => {
    res.render('registro', {
        layout: 'registro'
    })
})

router.post('/', async (req, res) => {
    const email = req.body
    const { target_file } = req.files
    console.log('FUNCIONA')
    console.log(target_file)
    console.log(email)
    const ruta = path.join(__dirname, 'assets', 'imgs', `imagen-prueba.jpg`) // Utiliza el path.join para facilitar las rutas
    console.log(ruta)
    target_file.mv(ruta, (err) => {
        res.render('registro', {
            layout: 'registro'
        })
    })
})

module.exports = router