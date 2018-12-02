let sessions = require('../mocks-data/sessions-data')

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

function invalidatePreviousSessions (email) {
  const deletedSessions = sessions.filter(session => session.email !== email)
  sessions = deletedSessions
  return sessions
}

function newSession (email) {
  const session = {
    email: email,
    APIkey: 't4s92gw5-1331-240f-3216-g2x1j7j921hp',
    expiry: (new Date()).addDays(1)
  }
  sessions = invalidatePreviousSessions(email)
  sessions.push(session)
  return sessions
}

function getSession (APIkey) {
  return sessions.filter(session => session.APIkey === APIkey)[0]
}

function checkSession (APIkey, email) {
  if (!sessions.filter(session => session.APIkey === APIkey)[0]) {
    return false
  } else if ((sessions.filter(session => session.APIkey === APIkey))[0].expiry <= new Date()) {
    return true
  }
  invalidatePreviousSessions(email)
  return false
}

function emailFromSession (APIkey) {
  const session = sessions.filter(session => session.APIkey === APIkey)[0]
  if (!session) {
    return ''
  }
  return session.email
}

module.exports = {
  invalidatePreviousSessions,
  emailFromSession,
  checkSession,
  getSession,
  newSession
}
