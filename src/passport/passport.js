const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/modelRegistro');
const { transporter } = require('../email/email');
const { generarJWT } = require('../helpers/generar-jwt');
const { Config } = require('../config/config');
const logger = require('../utils/logger')


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  nameField: 'nombre',
  telefonoField: 'telefono',
  edadField: 'edad',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ 'email': email })
  if (user) {
    logger.warn(`el user ${user.email} ya existe`)
    return done("User already exists", false);
  }
  else {
    const newUser = new User();
    newUser.email = email;
    newUser.nombre = req.body.nombre
    newUser.edad = req.body.edad
    newUser.telefono = req.body.telefono
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    const token = await generarJWT(newUser.id)
    logger.info(`el token del user es ${token}`)
    await transporter.sendMail({
      from: 'Registro',
      to: Config.USER,
      subject: 'nuevo usuario registrado',
      html: `Nombre: ${newUser.nombre} Edad:${newUser.edad} Telefono: ${newUser.telefono} Email: ${newUser.email}`
    })

    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    logger.warn(`invalid credentials`)
    return done("Invalid credentials", null);;
  }
  if (!user.comparePassword(password)) {
    logger.warn(`invalid credentials`)
    return done("Invalid credentials", null);
  }
  const token = await generarJWT(user.id)
  
  logger.info(`el token del user es ${token}`)

  return done(null, user);
}));




