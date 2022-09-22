const passport = require('passport');

const getLogin = (req, res) => {
    res.render('signin')
}

const postLogin = passport.authenticate('local-signin', {
    successRedirect: '/api/productos',
    failureRedirect: '/faillogin',
    failureFlash: true
},

);

const getLogout = (req, res) => {
    req.logout();
    res.redirect('/api/auth/signin');
}


module.exports = {
    getLogin,
    postLogin,
    getLogout
}
