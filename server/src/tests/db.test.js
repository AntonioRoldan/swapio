const db = require('../db')

const s = obj => JSON.stringify(obj, null, 2)

describe('User authentication methods', () => {
  test('Register user', done => { 
    const username = 'VladimirPutin'
    const email = 'Vladimir@putin.com'
    const password = 'VladimirPutin'
    const user = {
        email: 'Vladimir@putin.com'
    }
    db.registerUser(email, password, (_, userData) => {
        expect(s(userData)).toBe(s(user))
        done()
    })
})
  test('User login', done => {
    done()
  })
  test('User logout', done => { 
    done()
  })
})