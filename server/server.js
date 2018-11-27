const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./src/modules/db')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 4000

app.post('/register', (req, res) => {
    db.registerUser(req.body.email, req.body.password, (err, data) => {
        if(err) return res.status(data)
        return res.send(data)
    })
})

app.post('/logout', (req, res) => { 
    db.logoutUser(req.body.session, (error, data) => {
        if(error) return res.status(404).send(data)
        return res.send(data)
    })
})

app.post('/login', (req, res) => { //?
    db.loginUser(req.body.email, req.body.password, (error, result) => {
        if(error) return res.status(error).send(result)
        return res.send(result)
    })
})

app.get('/who-am-i', (req, res) => { //?
    db.whoAmI(req.headers.authorization, (err, email) => {
        if(err) return res.status(err).send(email)
        return res.send(email)
    })
})

app.get('/item-details', (req, res) => {
    db.getItemDetails(req.headers.authorization, (err, item) => {
        if(err) return res.status(err).send(item)
        return res.send(item)
    })
})

app.get('/my-swaps', (req, res) => {
    db.whoAmI(req.headers.authorization, (err, email) => {
        if(err) return res.status(err).send(email)

        db.findMySwaps(email, (err, result) => {
            if (err) return res.status(err).send(result)
            return res.send(result)
        })
    })
})

app.post('/check-session', (req, res) => { //?
    db.checkSession(req.body.session, session => {
        return res.send(session)
    })
})


app.get('/ping', (_, res) => {
    res.send('pong')
})

app.listen(port, () => console.log(`App listening on port ${port}`))


module.exports = app
