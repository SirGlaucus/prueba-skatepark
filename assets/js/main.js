console.log('Hola mundo')

const programa = () => {
    const botonEliminar = document.querySelector('#boton-eliminar')

    botonEliminar.addEventListener('click', (event) => {
        const emailEliminar = event.target.dataset.email
        const token = localStorage.getItem('token')
        console.log(token)
        fetch(`http://localhost:3000/datos/?email=${emailEliminar}&token=${token}`, {
            method: 'DELETE'
        }).then(res => {
            res.json().then((data) => {
                console.log(data)
                alert('Usuario eliminado con exito!')
                window.location.replace('/login')
            })
        }).catch((err) => {
            alert('Error al eliminar usuario')
        })
    })
}
programa()