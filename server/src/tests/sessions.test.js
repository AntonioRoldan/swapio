const sessions = require('../modules/mocks/sessions')

const s = obj => JSON.stringify(obj, null, 2)

describe('Session methods', () => {
  //test('Add days', done => {

  //})
  test('Invalidate previous sessions', done => {
    expect(sessions.invalidatePreviousSessions('antonio@gmail.com').length).toBe(2)
    done()
  })
  test('Adding a new session', done => {
    expect(sessions.newSession('Palpatine@senate.com').length).toBe(3) //If new user logs in we add a new element and the array's length is incremented by one 
    expect(sessions.newSession('Palpatine@senate.com').length).toBe(3) //If a user logs in when there already is a session for them, that session must be deleted and so the length will be the same
    done() 
  })
  test('Getting a session', done => {
    sessionEmail = 'Palpatine@senate.com'
    expect(sessions.getSession('t4s92gw5-1331-240f-3216-g2x1j7j921hp').email).toBe(sessionEmail) //If we are extracting a session we expect its email to match the user email we have 
    done()
  })
  test('Checking the validity of a session', done => { 
    expect(sessions.checkSession('michael@hotmail.com', '132452')).toBe(false) //If a session does not exist, it has already expired therefore the function returns false 
    done()
  })
  test('Getting an email via APIkey', done => {
    const APIkey = 't4s92gw5-1331-240f-3216-g2x1j7j921hp'
    expect(sessions.emailFromSession(APIkey)).toBe('Palpatine@senate.com')
    done()
  })
})

setTimeout(() => process.exit(0), 3000)