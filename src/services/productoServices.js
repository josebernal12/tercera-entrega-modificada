const productDao = require('../daos/productDao')

exports.mostrarProductos = async () => {

    const producto = await productDao.mostrarProductos()

    return producto
}
exports.obtenerProductoPorId = async (id) => {

    const producto = await productDao.obtenerProductoPorId(id)

    return producto
}
exports.CrearProducto = async (nombre, precio, stock) => {
   
    const producto = await productDao.CrearProducto(nombre, precio, stock)

    return producto
}
exports.actualizarProducto = async (product, id) => {

    const producto = await productDao.actualizarProductos(id, product)

    return producto
}
exports.eliminarProducto = async (id) => {

    const producto = await productDao.eliminarProducto(id)

    return producto
}

