// This module initialises the database for the tests to be backed by some real data

const { mongoose } = require('./modules/mongoose')

const User = require('./models/user')
const Session = require('./models/session')
const Item = require('./models/item')

const userMocks = require('../src/modules/mocks/mocks-data/users-data')
const sessionMocks = require('../src/modules/mocks/mocks-data/sessions-data')
const itemMocks = require('../src/modules/mocks/mocks-data/items-data')

const db = mongoose.connection

async function clean (callback) {
  await User.remove({})
  await Session.remove({})
  await Item.remove({})
  return callback()
}

function createNewData () {
  userMocks.map(userDef => {
    const u1 = new User(userDef)
    u1.save((err, u) => {
      if (err) console.error(err)
      console.log('added', u)
    })
  })

  sessionMocks.map(sessionDef => {
    const sess = new Session(sessionDef)
    sess.save((err, s) => {
      if (err) console.error(err)
      console.log('added', s)
    })
  })

  itemMocks.map(itemDef => {
    const item = new Item(itemDef)
    item.save((err, i) => {
      if (err) console.error(err)
      console.log('added', i)
    })
  })
}

db.once('open', () => {
  clean(() => {
    createNewData()
  })
})

setTimeout(() => {
  console.log('exiting...')
  process.exit(0)
}, 2000)
