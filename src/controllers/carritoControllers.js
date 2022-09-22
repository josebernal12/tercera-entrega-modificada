const { sendMessage } = require('../email/email')
const Carrito = require('../models/modelCarrito')
const logger = require('../utils/logger')
const { transporter } = require('../email/email')
const { Config } = require('../config/config')


const crearCarrito = async (req, res) => {

    try {
        const { email, pedido } = req.body
        const emailBD = await Carrito.findOne({ email })

        if (emailBD) {
            return res.json({ msg: 'ya hay un carrito con ese email' })
        }
        const carrito = new Carrito({ email, pedido })

        const carritodb = await carrito.save()

        res.json({
            carritodb
        })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Crear Carrito')
        console.log(error)
    }
}


const mostrarCarritos = async (req, res) => {

    try {
        const carrito = await Carrito.find()
            .populate({
                path: 'pedido.producto',
                model: 'Producto',

            }
            )


        res.render('carrito', { carrito: carrito })

    } catch (error) {
        logger.error('hablar con el administrador - ruta - Mostrar Carrito')

        console.log(error)
    }

}

const obtenerCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const carrito = await Carrito.findById(id)
            .populate({
                path: 'pedido.producto',
                model: 'Producto',

            })

        res.json({
            carrito
        })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Obtener Carrito')

        console.log(error)
    }

}


const actualizarCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const carrito = await Carrito.findByIdAndUpdate(id, req.body, { new: true })
            .populate({
                path: 'pedido.producto',
                model: 'Producto',

            })

        res.json({
            carrito
        })
    } catch (error) {
        logger.error('hablar con el administrador - ruta - Actualizar Carrito')

        console.log(error)
    }

}

const eliminarCarrito = async (req, res) => {

    try {
        const { id } = req.params

        const carritoEliminado = await Carrito.findByIdAndDelete(id, { new: true })


        res.json({
            carritoEliminado
        })
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