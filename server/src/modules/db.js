const User = require('../models/user')
const Item = require('../models/item')
const validation = require('./validation')
const sessions = require('./sessions')
require('./mongoose')
const email = require('../email')

function registerUser (email, password, callback) { // tested
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
      const u = new User({ email: email, password: password })
      u.save().then((userData) => {
        return callback(false, {
          email: userData.email
        }) // The code must be changed to be more testable
      }, e => {
        console.log(e)
        return callback(500, e.message)
      })
    }
  })
}

function addItem (email, title, description, imgurl, callback) {
  const i = new Item({
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

async function findMySwaps (currentUserEmail, callback) {
  let swaps = []

  const currentUser = (await User.find({ email: currentUserEmail }))[0]

  const users = await User.find({})

  // for every user
  for (const user of users) {
    // for every item every user has
    for (const item of (await Item.find({ email: user.email }))) {
      // for items the logged in user wants
      for (const wantsTitle of currentUser.userWants) {
        // if the current user wants that item then check reverse trades
        if (item.title === wantsTitle) {
          // for item you have
          for (const currentUserHasItem of (await Item.find({ email: currentUserEmail }))) {
            // if looped user wants the item you have, push to swaps list
            if (user.userWants.includes(currentUserHasItem.title)) {
              swaps.push({
                key: `${currentUserHasItem._id}-${item._id}`,
                yourItem: currentUserHasItem,
                theirItem: item,
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

  callback(false, swaps)
}

function getItemDetails (itemId, callback) {
  Item.findById(itemId, (err, item) => {
    if (err) return callback(500, 'Unable to connect to database')
    return callback(false, item)
  })
}

function logoutUser (APIkey, callback) {
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

function checkSession (APIkey, callback) {
  sessions.getSession(APIkey, session => callback(session))
}

function whoAmI (APIkey, callback) {
  sessions.emailFromSession(APIkey, email => {
    if (email) return callback(false, email)
    return callback(404, 'User not found')
  })
}

function userBySession (APIKey, callback) {
  whoAmI(APIKey, (err, data) => {
    if (err) return callback(err, "Can't get logged in user")
    User.find({ email: data }, (err, data) => {
      if (err) return callback(err, "Can't find 'to' user")

      const user = data[0]
      return callback(false, {
        '_id': user._id,
        'email': user.email,
        'userHas': user.userHas,
        'userWants': user.userWants
      })
    })
  })
}

function loginUser (email, password, callback) {
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

function contactUser (toUserId, fromUserId, message, callback) {
  const getToUser = User.findById(toUserId).exec()
  const getFromUser = User.findById(fromUserId).exec()
  Promise.all([getToUser, getFromUser])
    .then(values => {
      const [toUser, fromUser] = values
      if (!toUser || !fromUser) return callback(404, 'User(s) not found')
      email.send(toUser.email, `Message from ${fromUser.email}!`, message, callback)
    })
    .catch(err => callback(500, err))
}

function addToWishlist (APIkey, items, callback) {
  userBySession(APIkey, (err, user) => {
    if (err) return callback(err)
    if (!user) return callback(404)
    User.findByIdAndUpdate(user._id, {
      $addToSet: { userWants: { $each: items } }
    }, (err, user) => {
      if (err) return callback(err)
      return callback(false, user.userWants)
    })
  })
}

const getSession = sessions.getSession

module.exports = {
  registerUser,
  logoutUser,
  loginUser,
  whoAmI,
  checkSession,
  addItem,
  findMySwaps,
  getItemDetails,
  contactUser,
  getSession,
  addToWishlist,
  userBySession
}
