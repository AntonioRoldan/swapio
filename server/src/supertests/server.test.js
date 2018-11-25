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
}

setTimeout(tests, 200)
setTimeout(() => {
    process.exit(0)
}, 2000)