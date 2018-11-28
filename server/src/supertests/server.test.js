const request = require('supertest')
const test = require('tape')
const server = require('../../server')

const tests = () => {
  test('User registration', t => {
    request(server) 
        .post('/register')
        .send({
            email: 'teodorAtaranov@hotmail.com',
            password: 'cowboyfromhell'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, result) => {
          if (err) throw err
          const registeredUser = {
            email: 'teodorAtaranov@hotmail.com'
          }
          t.same(result.body, registeredUser)
          t.end()
        })
  })
  test('User logout', t => {
    request(server) 
        .post('/logout')
        .send({
            session:'a7f93de1-7557-43f-9482-i1o4g2o978jl'
        })
        .expect(200)
        .end((err, result) => {
          if (err) throw err
          t.same(result.body, {})
          t.end()
        })
  })
  test('Add item', t => {
    request(server)
      .post('/add-item')
      .send({
        title: 'Potion',
        description: 'Love potion',
        imgurl: 'añosidhgñv',
        email: 'Michael@hotmail.com'
      })
      .expect(200)
      .end((err, result) => {
        if(err) throw err
        const addedItem = {
          title: 'Potion',
          description: 'Love potion',
          imgurl: 'añosidhgñv',
          email: 'Michael@hotmail.com'
        }
        const dataToBeCompared = {
          title: (result.body).title,
          description: (result.body).description,
          imgurl: (result.body).imgurl,
          email: (result.body).email
        }
        t.same(dataToBeCompared, addedItem)
        t.end()
      })
  })
  test('View item', t => {
    request(server)
      .get('/item-details')
      .send({
        Headers: {
          Authorization: '5bfdab9a5293d56a12ec4cc2' //Id changes with each database initialisation 
        }
      })
      .expect(200)
      .end((err, result) => {
        if(err) throw err
        const data = {
          title: 'macbook air',
          email:'antonio@gmail.com'
        }
        const dataToBeCompared = {
          title: (result.body).title,
          email: (result.body).email
        }
        t.same(dataToBeCompared, data)
        t.end()
      })
  })
  test('Swapping algoriithm', t => {
    request(server)
      .post('/my-swaps')
      .send({
        session: '32c046c1-5b70-4430-98a8-2feba4f9e429'
      })
      .expect(200)
      .end((err, result) => {
        if(err) throw err
        const yourItem = {
            id: "5bfdab9a5293d56a12ec4cc3", //Id changes with each database initialisation
            title: "lambo",
            email: "bananaman@fruitmail.org"
        }
        const theirItem = {
            id: '5bfdab9a5293d56a12ec4cbf', //Id changes with each database initialisation 
            title: 'table',
            email: 'bob@lmao.com'
        }
        const swapWithUser = {
            id: "5bfdab9a5293d56a12ec4cb7", //Id changes with each database initialisation 
            email: "bob@lmao.com"
        }
        const yourItemData = {
          id: ((result.body).yourItem).id,
          title: ((result.body).yourItem).title,
          email: ((result.body).yourItem).email
      }
      const theirItemData = {
          id: ((result.body).theirItem).id,
          title: ((result.body).theirItem).title,
          email: ((result.body).theirItem).email
      }
      const swapWithUserData = {
          id: ((result.body).swapWithUser).id,
          email: ((result.body).swapWithUser).email
      }
      t.same(yourItemData, yourItem)
      t.same(theirItemData, theirItem)
      t.same(swapWithUserData, swapWithUser)
      t.end()
      })
  })
  test('Get user details from session', t => {
    request(server)
      .get('/who-am-i')
      .send({Headers: {Authorization: 'd6f85ab4-8288-440c-8061-f3b2f5c050dc'}})
      .expect(200)
      .end((err, result) => {
        if(err) throw err
        t.same(result.body, 'bob@lmao.com')
        t.end()
      })
  })
}

setTimeout(tests, 200)
setTimeout(() => {
    process.exit(0)
}, 2000)