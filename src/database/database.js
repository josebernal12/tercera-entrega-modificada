const { Config } = require('../config/config')
const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(Config.MONGO)
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    dbConnection
}