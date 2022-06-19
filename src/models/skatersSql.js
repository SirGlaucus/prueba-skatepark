const pool = require('../utils/conecction')

const getSkaters = async () => {
    try {
        const result = await pool.query('SELECT * FROM skaters')
        console.log(result.rows)
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}

const createSkater = async (datos) => {
    try {
        const query = {
            text: 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: ['prueba', 'prueba', 'prueba', '22', 'prueba', 'prueba', 'true']
        }
        const result = await pool.query(query)
        console.log(result.rows[0])
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getSkaters,
    createSkater
}