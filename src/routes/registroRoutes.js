const express = require('express')
const { createSkater } = require('../models/skatersQueries')
const path = require('path')
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
    const datos = req.body
    if (datos.password === datos.passwordVerification) {
        const ruta = path.join(__dirname, '..', '..', 'assets', 'img', foto.name)
        const datosArray = [datos.email, datos.name, datos.password, datos.experienceYears, datos.specialization, `img/${foto.name}`, true]
        await createSkater(datosArray)
        foto.mv(ruta, (err) => {
            res.render('registro', {
                layout: 'registro'
            })
        })
    } else {
        res.render('Por favor, verificar la contraseña')
    }
})

module.exports = router