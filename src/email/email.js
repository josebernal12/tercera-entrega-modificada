const { createTransport } = require('nodemailer');
const { Config } = require('../config/config');

const twilio = require('twilio')

const accountSide = Config.ACCOUNTSIDE
const authtoken = Config.AUTHTOKEN

const client = twilio(accountSide, authtoken)


const TEST_MAIL = Config.USER

const transporter = createTransport({
  host: Config.HOST,
  port: Config.EMAILPORT,
  auth: {
    user: TEST_MAIL,
    pass: Config.PASS
  }
});

async function sendMessage(number, nombre) {
  try {

    const message = await client.messages.create({
      to: `whatsapp:${number}`,
      from: 'whatsapp:+14155238886',
      body: `nuevo pedido de ${nombre}`
    });
    return message;

  } catch (error) {
    console.log(error);
  }
}






module.exports = {
  transporter,
  sendMessage


}