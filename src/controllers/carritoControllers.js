const { sendMessage } = require('../email/email')
const Carrito = require('../models/modelCarrito')
const logger = require('../utils/logger')
const { transporter } = require('../email/email')
const { Config } = require('../config/config')
const carritoServices = require('../services/carritoServices')


const crearCarrito = async (req, res) => {

    try {
        
        const cartCreated = await carritoServices.crearCarrito(req.body)
        res.json({
            cartCreated
        })


    } catch (error) {
        logger.error('hablar con el administrador - ruta - Crear Carrito')
        res.json(error)
    }
}


const mostrarCarritos = async (req, res) => {

    try {

        const cart = await carritoServices.mostrarCarrito()
        res.json({
            cart
        })


       

    } catch (error) {
        logger.error('hablar con el administrador - ruta - Mostrar Carrito')

        console.log(error)
    }

}

const obtenerCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const cart = await carritoServices.obtenerCarritoPorId(id)
        res.json({
            cart
        })

    } catch (error) {
        logger.error('hablar con el administrador - ruta - Obtener Carrito')

        console.log(error)
    }

}


const actualizarCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const updatedCart = await carritoServices.actualizarCarrito(id, req.body)
        res.json({ updatedCart })

        
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Actualizar Carrito')

        console.log(error)
    }

}

const eliminarCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const deletedCart = await carritoServices.eliminarCarrito(id)
        res.json({ deletedCart })

       
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Eliminar Carrito')

        console.log(error)
    }

}


const comprarCarrito = async (req, res) => {

    const { id } = req.params

    const carritoComprado = await Carrito.findByIdAndDelete(id)



    const whatsapp = await sendMessage(req.usuario.telefono, req.usuario.nombre)


    await transporter.sendMail({
        from: 'carrito comprado',
        to: Config.USER,
        subject: 'carrito comprado',
        html: `carrito comprado de ${req.usuario.nombre}`
    })

    res.json({
        msg: 'carrito comprado',
        whatsapp

    })

}



module.exports = {

    crearCarrito,
    mostrarCarritos,
    obtenerCarrito,
    actualizarCarrito,
    eliminarCarrito,
    comprarCarrito
}