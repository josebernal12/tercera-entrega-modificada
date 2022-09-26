const Productos = require('../models/modelProducto')
const logger = require('../utils/logger')
const productoServices = require('../services/productoServices')


const mostrarProductos = async (req, res) => {

    const response = await productoServices.mostrarProductos()

    res.json(response)

    // const [total, productos] = await Promise.all([
    //     Productos.countDocuments(),
    //     Productos.find()
    //         .populate('usuario', 'nombre')
    // ])

    // res.json({
    //     total,
    //     productos
    // })

    // res.render('producto', { productos: productos })
}

const obtenerProductoPorID = async (req, res) => {

    try {
        const { id } = req.params
        const producto = await productoServices.obtenerProductoPorId(id)
        res.json({
            producto
        })

        // const producto = await Productos.findById(id)
        //     .populate('usuario', 'nombre')

        // res.json({
        //     producto
        // })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Obtener Producto por ID')

        console.log(error)
    }

}

const crearProducto = async (req, res) => {

    try {

        const { ...body } = req.body

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const productCreated = await productoServices.CrearProducto(data)

        res.json(productCreated)

        // const { ...body } = req.body

        // const producto = await Productos.findOne({ nombre: body.nombre })

        // if (producto) {
        //     return res.status(401).json({
        //         msg: `el producto ${producto.nombre} ya existe`
        //     })

        // }
        // const data = {
        //     ...body,
        //     nombre: body.nombre.toUpperCase(),
        //     usuario: req.usuario._id

        // }

        // const productodb = new Productos(data)
        // await productodb.save({ timestamps: { createdAt: true, updatedAt: false } })

        // res.json({
        //     msg: `se agrego un nuevo producto ${productodb.nombre}`
        // })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Crear Producto')

        res.json(error)
    }
}

const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params
        const product = await productoServices.actualizarProducto(id, req.body)
        res.json(product)


        // const { ...data } = req.body

        // const productoActualizado = await Productos.findByIdAndUpdate(id, data, { new: true })
        //     .populate('usuario', 'nombre')

        // res.json({
        //     productoActualizado
        // }) 


    } catch (error) {
        logger.error('hablar con el administrador - ruta - Actualizar Producto')

        console.log(error)
    }
}

const eliminarProducto = async (req, res) => {

    try {
        const { id } = req.params

        const productoEliminado = await productoServices.eliminarProducto(id)
        

        res.json({
            productoEliminado
        })

        // const productoEliminado = await Productos.findByIdAndDelete(id, { new: true })
        //     .populate('usuario', 'nombre ')

        // res.json({
        //     productoEliminado
        // })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Eliminar Producto')

        console.log(error)
    }
}

module.exports = {
    mostrarProductos,
    obtenerProductoPorID,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}