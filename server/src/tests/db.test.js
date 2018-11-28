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

describe('Item methods', () => {
    test('Add item', done => {
        const data = {
            title: 'Potion',
            description: 'Love potion',
            imgurl: 'añosidhgñv',
            email: 'Michael@hotmail.com'
        }
        db.addItem(data.email, data.title, data.description, data.imgurl, (_, itemData) => {
            dataToBeCompared = {
                title: itemData.title,
                description: itemData.description,
                imgurl: itemData.imgurl,
                email: itemData.email
            }
            expect(s(dataToBeCompared)).toBe(s(data))
            done()
        })
    })
    test('View item', done => {
        const id = '5bfdab9a5293d56a12ec4cc2'
        const data = {
            title: 'macbook air',
            email:'antonio@gmail.com'
        }
        db.getItemDetails(id, (_, item) => {
            dataToBeCompared = {
                title: item.title,
                email: item.email
            }
            expect(s(dataToBeCompared)).toBe(s(data))
            done()
        })
    })
})
describe('Swapping algorithm', () => {
    test('Swapping algorithm', done => {
        const email = 'bananaman@fruitmail.org'
        const yourItem = {
            id: "5bfdab9a5293d56a12ec4cc3",
            title: "lambo",
            email: "bananaman@fruitmail.org"
        }
        const theirItem = {
            id: '5bfdab9a5293d56a12ec4cbf',
            title: 'table',
            email: 'bob@lmao.com'
        }
        const swapWithUser = {
            id: "5bfdab9a5293d56a12ec4cb7",
            email: "bob@lmao.com"
        }
        db.findMySwaps(email, (_, swap) => {
            const yourItemData = {
                id: (swap.yourItem).id,
                title: (swap.yourItem).title,
                email: (swap.yourItem).email
            }
            const theirItemData = {
                id: (swap.theirItem).id,
                title: (swap.theirItem).title,
                email: (swap.theirItem).email
            }
            const swapWithUserData = {
                id: (swap.swapWithUser).id,
                email: (swap.swapWithUser).email
            }
            expect(s(yourItemData)).toBe(s(yourItem))
            expect(s(theirItemData)).toBe(s(theirItem))
            expect(s(swapWithUserData)).toBe(swapWithUser)
            done()
        })

    })
})