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
  test('Get email from session', done => {
      const APIkey = 'd6f85ab4-8288-440c-8061-f3b2f5c050dc'
      const email = 'bob@lmao.com'
      db.whoAmI(APIkey, (_, data) => {
          expect(data).toBe(email)
          done()
      })
  })
  test('Logout user', done => {
      db.logoutUser('d6f85ab4-8288-440c-8061-f3b2f5c050dc', (_, message) => {
          expect(message).toBe('Success')
          done()
      })
  })
})