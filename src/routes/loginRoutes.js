const express = require('express')
const { getSkaters } = require('../models/skatersSql')
const jwt = require('jsonwebtoken')
const router = express.Router()


const llaveSecret = '1234'

router.get('/', async (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const skaters = await getSkaters()
    const user = skaters.find((u) => u.email === email && u.password === password)
    if (user) {
        // Paso 5
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 120,
            data: user,
        }, llaveSecret)
        res.redirect('/datos')
    } else {
        res.send("Usuario o contraseña incorrecta")
    }
})

module.exports = router