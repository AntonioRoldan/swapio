const User = require('../models/user')
const validation = require('./validation')
const sessions = require('./sessions')
require('./mongoose')

function registerUser(email, password, callback) { //tested
  User.findOne({ email: email }, (err, user) => {
      if (err) {
          return callback(500, 'Failed to connect to database')
      }
      if (user) {
          return callback(400, 'User already exists')
      } else {
          try {
              validation.validUser({
                  email: email,
                  password: password
              })
          } catch (e) {
              return callback(406, e.message)
          }
          const u = new User({email: email, password: password })
          u.save().then((userData) => {
              return callback(false, {
                  email: userData.email
              }) //The code must be changed to be more testable
          }, e => {
              console.log(e)
              return callback(500, e.message)
          })
      }
  })
}

module.exports = {registerUser, logoutUser}