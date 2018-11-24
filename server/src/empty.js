const User = require('./models/user')
const Session = require('./models/session')
const Item = require('./models/item')
console.log('deleting')
Session.remove({}).exec()
User.remove({}).exec()
console.log('deleted')

