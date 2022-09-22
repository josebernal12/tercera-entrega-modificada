const Productos = require('../models/modelProducto')
const User = require('../models/modelRegistro')
const Carrito = require('../models/modelCarrito')

const existeProductoPorId = async (id) => {

    const producto = await Productos.findById(id)

    if (!producto) {
        throw new Error(`el producto con el ${id} no existe`)
    }

}

const existeCarritoPorId = async (id) => {

    const carrito = await Carrito.findById(id)

    if (!carrito) {
        throw new Error(`el carrito con el ${id} no existe`)

    }
}
const existeEmail = async (email) => {

    const emailExiste = await User.findOne({ email })

    if (!emailExiste) {
        throw new Error(`el email ${email} no esta en la BD`)

    }
}








module.exports = {
    existeProductoPorId,
    existeCarritoPorId,
    existeEmail
}