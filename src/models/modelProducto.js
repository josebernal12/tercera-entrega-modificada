const { Schema, model } = require('mongoose')

const ProductosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'el precio es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },
    usuario:{
        type: Schema.ObjectId,
        ref: 'user',
       
    },
  
    carrito :{
      type: Schema.ObjectId,
      ref: 'Carrito'
    },
  

} ,{ timestamps: true })

   


module.exports = model('Producto', ProductosSchema)