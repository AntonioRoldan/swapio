const users = require('../mocks-data/users-data')

function makeSwap(email) {
  let user = {}
  let allUsers = users
  let swaps = []
  let userHas = []
  let userWants = []
  user = users.filter(user => user.email === email)[0]
  userHas = user.userHas
  userWants = user.userWants
  allUsers.forEach(function(user) { //For every other user in the database 
    (user.userHas).forEach(function(hasItem) {  //For every item user2 has 
      if(userWants.includes(hasItem)){  //If user1 wants it 
        (user.userWants).forEach(function(wantsItem){ //for every item user2 wants
          if(userHas.includes(wantsItem)){  //If user1 has it 
            const swap = {  //There is a swap 
              item: hasItem,  //We store the item id 
              tradefor: wantsItem
            }
            swaps.push(swap)
          }
        })
      }
    })
  })
  return swaps
}

module.exports = {makeSwap}
