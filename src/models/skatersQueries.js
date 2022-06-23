const pool = require('../utils/conecction')

const getSkaters = async () => {
    try {
        const result = await pool.query('SELECT * FROM skaters')
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}

const createSkater = async (datos) => {
    try {
        const query = {
            text: 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: datos
        }
        const result = await pool.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const editSkater = async (datos) => {
    try {
        const query = {
            text: 'UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $5',
            values: datos
        }
        const result = await pool.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const deleteSkater = async (email) => {
    console.log(email + '')
    try {
        const query = {
            text: 'DELETE FROM skaters WHERE email = $1 RETURNING *',
            values: [email]
        }
        const result = await pool.query(query)
        console.log(result)
        return result.rowCount
    } catch (e) {
        // mostrarErrores(e)
        return e
    }
}

module.exports = {
    getSkaters,
    createSkater,
    editSkater,
    deleteSkater
}