

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/auth/signin')
    // res.json({
    // msg: 'no puedes crear producto'
    // })
}
const esAdminRole = async (req, res, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quire verificar el role sin validar el token primero'
        })
    }
    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }

    next()


  


}


module.exports = {
    isAuthenticated,
    esAdminRole
}