const mostrarErrores = (error) => {
    console.log('Error código: ' + error.code)
    console.log('Detalle del error: ' + error.detail)
    console.log('Tabla originaria del error: ' + error.table)
    console.log('Restricción violada en el campo: ' + error.constraint)
}

module.exports = mostrarErrores