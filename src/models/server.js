const path = require('path')
const express = require('express')
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const { dbConnection } = require('../database/database');
const { Config } = require('../config/config');
require('../passport/passport');
const app = express()

class Server {
    constructor() {
        this.app = app
        this.PORT = Config.PORT
        this.path = {
            carrito: '/api/carritos',
            productos: '/api/productos',
            login: '/api/auth',
            registrar: '/api/signup',


        }

        this.middlewares()
        this.CrearConexionBD()
        this.router()

    }
    middlewares() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(session({
            secret: Config.SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.set('views', path.join(__dirname, '../views'))
        this.app.engine('ejs', engine);
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(path.join(__dirname, '../views')))


    }

    async CrearConexionBD() {
        await dbConnection()
    }

    router() {
        this.app.use((req, res, next) => {
            app.locals.user = req.user;
            next();
        });

        this.app.use(this.path.registrar, require('../routes/registrarUsuario'))
        this.app.use(this.path.login, require('../routes/login'))
        this.app.use(this.path.productos, require('../routes/Producto'))
        this.app.use(this.path.carrito, require('../routes/Carrito'))
        this.app.use('*', (req, res) => {
            res.render('failpage')
        })
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`escuchando el puerto ${this.PORT}`)
        })
    }

}


module.exports = Server