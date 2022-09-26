const carritoDaos = require('../daos/carritoDaos')

exports.mostrarCarrito = async () => {

    const carrito = await carritoDaos.mostrarCarrito()

    return carrito

}
exports.obtenerCarritoPorId = async (id) => {

    const carrito = await carritoDaos.obtenerCarritoPorId(id)

    return carrito

}
exports.crearCarrito = async (email, pedido) => {

    const carrito = await carritoDaos.crearCarrito(email, pedido)

    await carrito.save()

    return carrito

}
exports.actualizarCarrito = async (id, cart) => {

    const carrito = await carritoDaos.actualizarCarrito(id, cart)

    return carrito

}
exports.eliminarCarrito = async (id) => {

    const carrito = await carritoDaos.eliminarCarrito(id)

    return carrito

}

