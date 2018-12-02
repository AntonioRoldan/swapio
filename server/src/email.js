const nodemailer = require('nodemailer')

// if (!process.env.EMAIL || !process.env.PASSWORD) {
// throw new Error('remember to make an .env file with EMAIL and PASSWORD')
// }

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'swapio51@gmail.com',
    pass: 'Gilipolxlas7'
  }
})

const send = (to, subject, message, callback) => {
  const options = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: message
  }
  transporter.sendMail(options, callback)
}

module.exports = { send }
