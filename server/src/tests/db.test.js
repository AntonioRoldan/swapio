const db = require('../modules/db')
const s = obj => JSON.stringify(obj, null, 2)

describe('User registration', () => {
  test('Register user', done => { 
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
})
