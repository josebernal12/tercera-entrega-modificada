const passport = require('passport');

const getUsers = (req, res) => {
    res.render('signup');
}

const postUsers = passport.authenticate('local-signup',
    {
        successRedirect: '/api/productos',
        failureRedirect: '/failuser',
        failureFlash: true,
    }
)


module.exports = {
    getUsers,
    postUsers,

}