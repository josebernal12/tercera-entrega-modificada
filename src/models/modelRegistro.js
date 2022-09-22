const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },
    edad: {
        type: Number,
        required: [true, 'la edad es obligatorio'],

    },
    telefono: {
        type: Number,
        required: [true, 'el telefono es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,

    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);