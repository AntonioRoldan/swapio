const valid = require('../modules/validation')

describe('User validation', () => {
  test('Valid email', done => {
    expect.assertions(2)
    expect(valid.validEmail('Robert@hotmail.com')).toBe(true)
    expect(valid.validEmail('Michael')).toBe(false)
    done()
  })
  test('Valid password', done => {
    expect(() => {
      function validPassword () {
        valid.validPassword('wha')
      }
      expect(validPassword).toThrowError('Password not long enough')
    })
    expect(valid.validPassword('whatever')).toBe(true)
    done()
  })
  test('Valid user', done => {
    const user = {
      email: 'Robert@hotmail.com',
      password: 'whatever'
    }
    expect(valid.validUser(user)).toBe(true)
    const invalidUserEmail = {
      email: 'Michael',
      password: 'whatever'
    }
    expect(valid.validUser(invalidUserEmail)).toBe(false)
    expect(() => {
      function validPassword () {
        const invalidUserPassword = {
          email: 'Michael',
          password: 'wha'
        }
        valid.validPassword(invalidUserPassword)
      }
      expect(validPassword).toThrowError('Password not long enough')
    })
    done()
  })
})

setTimeout(() => process.exit(0), 3000)
