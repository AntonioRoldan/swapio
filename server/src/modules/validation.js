
function validUser (user) {
  return validEmail(user.email) && validPassword(user.password)
}

function validEmail (email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
}

const validPassword = password => {
  if (password.length < 7) {
    throw new Error('Password not long enough')
  }
  return true
}

module.exports =
{ validUser,
  validEmail,
  validPassword }
