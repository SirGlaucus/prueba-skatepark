const express = require('express')
const { getSkaters, editSkater, deleteSkater } = require('../models/skatersQueries')
const jwt = require('jsonwebtoken')
const router = express.Router()

const llaveSecret = '1234'

router.get('/', async (req, res) => {
    let { token } = req.query
    jwt.verify(token || '', llaveSecret, async (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Error de autenticacion' })
            return
        }
        const email = decoded.data.email
        const usuarios = await getSkaters()
        const skater = usuarios.filter((u) => u.email === email)
        if (err) {
            res.status(401).send({
                error: "401 Unauthorized",
                message: err.message,
            })
        } else {
            res.render('datos', {
                layout: 'datos',
                skater: skater[0],
                token,
            })
        }
    })
})

router.post('/', async (req, res) => {
    let { token } = req.query
    jwt.verify(token || '', llaveSecret, async (err, decoded) => {
        const datos = req.body
        if (datos.password === datos.passwordVerification) {
            const datosArray = [datos.name, datos.password, datos.experienceYears, datos.specialization, datos.email]
            await editSkater(datosArray)
            res.redirect('/login')
        } else {
            res.render('Por favor, verificar la contraseña')
        }
    })
})

router.delete('/', async (req, res) => {
    
    const { token, email } = req.query
    //console.log(email)
    //console.log(token)
    jwt.verify(token, llaveSecret, async (err, decoded) => {
        console.log(err, decoded, token, llaveSecret)
        if (err) {
            console.log('Entro al error')
            res.status(403).json({ message: 'Error de autenticacion' })
            return
        }
        try {
            console.log('Alguna cosa')
            await deleteSkater(email)
            console.log('Llega')
            res.json({ message: 'Eliminado' })
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar' })
        }
    })
})


module.exports = router