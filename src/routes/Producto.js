const { check } = require('express-validator');

const { mostrarProductos, obtenerProductoPorID, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoControllers');
const { existeProductoPorId } = require('../helpers/db-validator');
const { isAuthenticated, esAdminRole } = require('../middlewares/authenticated');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = require('express').Router();

// le quite el isAuthenticated para poder probarlo con postman
router.get('/',  mostrarProductos)

router.get('/:id', [
    // isAuthenticated,
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProductoPorID)

router.post('/', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('precio', 'el precio es obligatorio').not().isEmpty(),
    check('stock', ' el stock es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // isAuthenticated,
    check('id', ' no es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProducto)




module.exports = router