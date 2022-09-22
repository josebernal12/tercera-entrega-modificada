const router = require('express').Router();

const { subirArchivo } = require('../controllers/subirArchivo');
const { getUsers, postUsers } = require('../controllers/user');


router.get('/', getUsers);

router.post('/', subirArchivo, postUsers);



module.exports = router