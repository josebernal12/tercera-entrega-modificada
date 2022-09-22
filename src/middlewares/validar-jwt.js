const jwt = require('jsonwebtoken')
const { Config } = require('../config/config')
const User = require('../models/modelRegistro')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token')
    if (!token) {
        return res.redirect('/api/auth/signin')
    }
    try {

        const { uid } = jwt.verify(token, Config.SECRETORPRIVATEKEY)

        const usuario = await User.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }


        req.usuario = usuario
        next()
    } catch (error) {

        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validarJWT
}