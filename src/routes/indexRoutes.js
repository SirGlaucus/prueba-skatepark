const express = require('express')
const { getSkaters } = require('../models/skatersQueries')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const skaters = await getSkaters()
        if (skaters) {

            res.render('index', {
                layout: 'index',
                skaters: skaters
            })
        } else {
            res.statusCode(404).json({
                message: 'No se encontraron skaters'
            })
        }
    } catch (error) {
        res.statusCode(500).json({
            message: 'Error al buscar skaters'
        })
    }
})

module.exports = router