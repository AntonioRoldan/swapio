const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./src/modules/db')

const app = express()

require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())

const port = 4000

app.post('/register', (req, res) => {
  db.registerUser(req.body.email, req.body.password, (err, data) => {
    if (err) return res.status(data)
    return res.send(data)
  })
})

app.post('/logout', (req, res) => {
  db.logoutUser(req.body.session, (error, data) => {
    if (error) return res.status(404).send(data)
    return res.send(data)
  })
})

app.post('/login', (req, res) => {
  // ?
  db.loginUser(req.body.email, req.body.password, (error, result) => {
    if (error) return res.status(error).send(result)
    return res.send(result)
  })
})
app.get('/who-am-i', (req, res) => {
  // ?
  db.whoAmI(req.headers.authorization, (err, email) => {
    if (err) return res.status(err).send(email)
    return res.send(email)
  })
})
app.post('/add-item', (req, res) => {
  db.whoAmI(req.headers.authorization, (err, email) => {
    if (err) return res.status(err).send(email)

    db.addItem(email, req.body.title, req.body.description, req.body.imgurl, (err, data) => {
      if (err) return res.status(500).send(data)
      return res.send(data)
    })
  })
})
app.get('/item-details', (req, res) => {
  db.getItemDetails(req.headers.authorization, (err, item) => {
    if (err) return res.status(err).send(item)
    return res.send(item)
  })
})

app.get('/my-swaps', (req, res) => {
  db.whoAmI(req.headers.authorization, (err, email) => {
    if (err) return res.status(err).send(email)

    db.findMySwaps(email, (err, result) => {
      if (err) return res.status(err).send(result)
      return res.send(result)
    })
  })
})

app.post('/check-session', (req, res) => {
  // ?
  db.checkSession(req.body.session, session => {
    return res.send(session)
  })
})

app.post('/add-wishlist', (req, res) => {
  if (!req.headers.authorization) return res.status(400, 'No auth')
  if (!req.body.items) return res.status(400, "Please specify 'items' list")

  db.addToWishlist(req.headers.authorization, req.body.items, (error, wishlist) => {
    if (error) return res.status(error).send(wishlist)
    return res.send(wishlist)
  })
})

app.post('/send-message', (req, res) => {
  db.userBySession(req.headers.authorization, (err, data) => {
    if (err) return res.status(500).send(err)

    if (!req.body.to) return res.status(400).send("Specify 'to' user")

    const fromUser = data
    db.contactUser(req.body.to, fromUser._id, req.body.message, (err, data) => {
      if (err) res.status(err).send(data)
      res.send('Email was sent')
    })
  })
})

app.get('/ping', (_, res) => {
  res.send('pong')
})

app.listen(port, () => console.log(`App listening on port ${port}`))

module.exports = app
