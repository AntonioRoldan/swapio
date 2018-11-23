const { mongoose } = require('./mongoose')
const User = require('./models/user')

const userMocks = require('../tests/mock-data/users')

const db = mongoose.connection

db.once('open', () => {
  userMocks.map(userDef => {
    const u1 = new User(userDef)
    u1.save((err, u) => {
      if (err) console.error(err)
      console.log('added', u)
    })  
  })
})
