const express = require('express')
const { createSkater } = require('../models/skatersSql')
const path = require('path')
const app = express()
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('registro', {
        layout: 'registro'
    })
})

router.post('/', async (req, res) => {
    if (!req.files) {
        res.send("File was not found")
        return
    }
    const { foto } = req.files
    const email = req.body
    console.log('FUNCIONA')
    console.log(foto)
    console.log(email)
    const ruta = path.join(__dirname, 'assets', 'img', `imagen-prueba.jpg`) // Utiliza el path.join para facilitar las rutas
    console.log(ruta)
    foto.mv(ruta, (err) => {
        res.render('registro', {
            layout: 'registro'
        })
    })
})

module.exports = router