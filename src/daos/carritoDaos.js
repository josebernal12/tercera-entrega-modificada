const Carrito = require('../models/modelCarrito')


exports.mostrarCarrito = async () => {

    const carrito = await Carrito.find()
        .populate('producto', ' nombre')

    return carrito
}
exports.obtenerCarritoPorId = async (id) => {

    const carrito = await Carrito.findById(id)
        .populate('producto', ' nombre')

    return carrito
}
exports.crearCarrito = async (cartCreated) => {
    const emailExiste = await Carrito.findOne({ email: cartCreated.email })
    if (emailExiste) throw `el email ${emailExiste.email} ya tiene un carrito!`

    const carrito = new Carrito(cartCreated)

    return carrito
}
exports.actualizarCarrito = async (id, cart) => {

    const carrito = await Carrito.findById(id, cart, { new: true })
        .populate('producto', ' nombre')

    return carrito
}
exports.eliminarCarrito = async (id) => {

    const carrito = await Carrito.findByIdAndDelete(id, { new: true })
        .populate('producto', ' nombre')

    return carrito
}