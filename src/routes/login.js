const router = require('express').Router();
const { postLogin, getLogin, getLogout } = require('../controllers/login');

router.get('/signin', getLogin);

router.post('/signin', postLogin)

router.get('/logout', getLogout);




module.exports = router;