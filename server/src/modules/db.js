const User = require('../models/user')
const Item = require('../models/item')
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

function addItem(email, title, description, imgurl, callback) {
    i = new Item({
        title: title,
        description: description,
        imgurl: imgurl,
        email: email
    })
    i.save().then((itemData) => {
        return callback(false, itemData)
    }, e => {
        return callback(500, e.message)
    })
}

async function findMySwaps(currentUserEmail, callback) {
    let matches = []

    const currentUser = (await User.find({email: currentUserEmail}))[0]

    const users = await User.find({})

    for (const user of users) {
        for (const hasId of (await Item.find({email: user.email}))) {
            const item = await Item.findById(hasId)

            for (const wantsTitle of currentUser.userWants) {
                if (item.title == wantsTitle) {

                    let currentUserHas
                    try {
                        currentUserHas = await Item.find({email: currentUserEmail})
                    } catch (err) {
                        throw new Error(err)
                    }

                    for (const currentUserHasItem of currentUserHas) {
                        if (user.userWants.includes(currentUserHasItem.title)) {
                            matches.push({
                                swapItem: item,
                                swapForItem: currentUserHasItem,
                                swapWithUser: {
                                    _id: user._id,
                                    email: user.email    
                                }
                            })        
                        }
                    }
                }
            }
        }
    }

    callback(false, matches)
}

function logoutUser(APIkey, callback) { 
    sessions.getSession(APIkey, session => {
        if (session) {
            sessions.invalidatePrevSessions(session.email, () => {
                return callback(false, 'Success')
            })
        } else {
            return callback(404, `Cannot find session ${APIkey}`)
        }
    })
}

function checkSession(APIkey, callback) {
    sessions.getSession(APIkey, session => callback(session))
}

function whoAmI(APIkey, callback) { 
    sessions.emailFromSession(APIkey, email => {
        if (email) return callback(false, email)
        return callback(404, 'User not found')
    })
}

function loginUser(email, password, callback) { 
    User.findOne({ email: email }, (err, user) => {
        if (err) return callback(500, 'Internal server error')
        if (user) {
            if (user.password === password) {
                sessions.newSession(email, APIkey => {
                    return callback(false, APIkey)
                })
            } else {
                return callback(400, 'Invalid credentials')
            }
        } else {
            return callback(404, 'No such user exists!')
        }
    })
}

module.exports = {
    registerUser,
    logoutUser,
    loginUser,
    whoAmI,
    checkSession,
    addItem,
    findMySwaps
}