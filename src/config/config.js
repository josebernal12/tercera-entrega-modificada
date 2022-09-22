require('dotenv').config()

const Config = {

    PORT: process.env.PORT,
    MONGO: process.env.MONGO,
    USER: process.env.USER,
    PASS: process.env.PASS,
    SECRET: process.env.SECRET,
    SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY,
    ACCOUNTSIDE: process.env.ACCOUNTSIDE,
    AUTHTOKEN: process.env.AUTHTOKEN

}


module.exports = {
    Config

}