const router = require('express').Router();
const { check } = require('express-validator')
const {
    crearCarrito,
    mostrarCarritos,
    obtenerCarrito,
    actualizarCarrito,
    eliminarCarrito,
    comprarCarrito
} = require('../controllers/carritoControllers');
const { existeCarritoPorId, existeEmail, existeProductoPorId } = require('../helpers/db-validator');
const { isAuthenticated, esAdminRole } = require('../middlewares/authenticated');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// le quite el isAuthenticated para poder probarlo con postman

router.get('/', mostrarCarritos)

router.get('/:id', [
    // isAuthenticated,
    check('id', 'el id no es de mongo').isMongoId(),
    check('id').custom(existeCarritoPorId),
    validarCampos
], obtenerCarrito)

router.post('/', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('email', 'el email es requerido').not().isEmpty(),
    check('email').custom(existeEmail),
    // check('email').custom(existeProductoPorId),
    validarCampos
], crearCarrito)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('id', 'el id no es de mongo').isMongoId(),
    check('id').custom(existeCarritoPorId),
    validarCampos
], actualizarCarrito)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('id', 'el id no es de mongo').isMongoId(),
    check('id').custom(existeCarritoPorId),
    validarCampos
], eliminarCarrito)

router.delete('/comprar/:id', validarJWT, comprarCarrito)



module.exports = router