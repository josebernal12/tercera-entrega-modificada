const { Schema, model } = require('mongoose')

const CarritoSchema = Schema({

    email: {
        type: String,
        // required: [true, 'el email es requerido']
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Producto'
        },
        stock: Number
    }],



})

module.exports = model('Carrito', CarritoSchema)