const Productos = require('../models/modelProducto')
const logger = require('../utils/logger')
const productoServices = require('../services/productoServices')


const mostrarProductos = async (req, res) => {

    const response = await productoServices.mostrarProductos()

    res.json(response)

    
}

const obtenerProductoPorID = async (req, res) => {

    try {
        const { id } = req.params
        const producto = await productoServices.obtenerProductoPorId(id)
        res.json({
            producto
        })

       
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