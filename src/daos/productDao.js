const Productos = require('../models/modelProducto')

exports.mostrarProductos = async () => {

    const productos = await Productos.find()
        .populate('usuario', 'nombre')

    return productos
}
exports.obtenerProductoPorId = async (id) => {

    const productos = await Productos.findById(id)
        .populate('usuario', 'nombre')

    return productos
}
exports.CrearProducto = async (createdProduct) => {
    const productName = await Productos.findOne({ nombre: createdProduct.nombre })
    if (productName) throw 'el producto ya existe'

    const productos = new Productos(createdProduct)
    await productos.save()

    return productos
}
exports.actualizarProductos = async (product, id) => {

    const productos = await Productos.findByIdAndUpdate(id, product, { new: true })
        .populate('usuario', 'nombre')
    return productos
}
exports.eliminarProducto = async (id) => {

    const productos = await Productos.findByIdAndDelete(id, { new: true })
        .populate('usuario', 'nombre')
    return productos
}





