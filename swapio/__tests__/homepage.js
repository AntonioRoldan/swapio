const puppeteer = require('puppeteer')

const mockSessions = require('../../server/src/modules/mocks/mocks-data/sessions-data')
const mockSession = mockSessions[0]

const mockUsers = require('../../server/src/modules/mocks/mocks-data/users-data')
const mockUser = mockUsers.find(u => u.email === mockSession.email)

// to take a screenshot:
// await page.screenshot({ path: 'page.png' })

describe('If we load the homepage', () => {
  test('the welcome to swapio header is there', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/')

    await page.waitForSelector('h1')
    const h1Content = await page.evaluate(() => document.querySelector('h1').textContent)

    expect(h1Content).toBe('welcome to swapio')

    await browser.close()

    done()
  })

  test('the user can log in', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/login')

    await page.type('input[id=inputEmail]', mockUser.email)
    await page.type('input[id=inputPassword]', mockUser.password)

    await page.click('button[id=login-button]')

    await page.waitFor(1000)

    const navEmailContent = await page.evaluate(() => document.querySelector('[id=navbar-email]').textContent)

    expect(navEmailContent).toBe(mockUser.email)

    await browser.close()

    done()
  })

  test('the user can register', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/register')

    const randomUsername = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    const newEmail = `${randomUsername}@random-mail.org`

    await page.type('input[id=inputEmail', newEmail)
    await page.type('input[id=inputPassword]', 'password')
    await page.type('input[id=confirmPassword]', 'password')

    await page.click('button[id=register-button]')
    await page.waitFor(1000)

    const navEmailContent = await page.evaluate(() => document.querySelector('[id=navbar-email]').textContent)

    expect(navEmailContent).toBe(newEmail)

    await browser.close()

    done()
  })

  test('the user can add an item', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // login
    await page.goto('http://localhost:3000/login')
    await page.type('input[id=inputEmail]', mockUser.email)
    await page.type('input[id=inputPassword]', mockUser.password)
    await page.click('button[id=login-button]')
    await page.waitFor(1000)

    await page.goto('http://localhost:3000/additem')
    await page.type('input[id=title]', 'something')
    await page.type('textarea[id=description]', 'something')
    await page.type('input[id=imgurl]', 'https://i.ytimg.com/vi/CvIvwq6rz10/maxresdefault.jpg')
    await page.click('button[id=add-item-button]')
    await page.waitFor(1000)

    const itemTitle = await page.evaluate(() => document.querySelector('[id=title]').textContent)
    const itemDescription = await page.evaluate(() => document.querySelector('[id=description]').textContent)
    const itemImg = await page.evaluate(() => document.querySelector('[id=image]').src)

    expect(itemTitle).toBe('something')
    expect(itemDescription).toBe('something')
    expect(itemImg).toBe('https://i.ytimg.com/vi/CvIvwq6rz10/maxresdefault.jpg')

    await browser.close()

    done()
  })
  test('the user can modify their wishlist', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // login
    await page.goto('http://localhost:3000/login')
    await page.type('input[id=inputEmail]', mockUser.email)
    await page.type('input[id=inputPassword]', mockUser.password)
    await page.click('button[id=login-button]')
    await page.waitFor(1000)

    await page.goto('http://localhost:3000/addwishlist')
    await page.waitFor(1000)

    const itemTitle = 'test item thing'
    await page.type('input[id=input-wishlist]', itemTitle)
    await page.click('button[id=addWishlist')
    await page.waitFor(500)

    const wishlistItems = await page.evaluate(
      () => document.querySelector('ul[id=dbwishlist]').textContent
    )

    expect(wishlistItems.includes(itemTitle)).toBe(true)

    done()
  })
  test('the user can find a possible swap', async done => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // login
    await page.goto('http://localhost:3000/login')
    await page.type('input[id=inputEmail]', mockUser.email)
    await page.type('input[id=inputPassword]', mockUser.password)
    await page.click('button[id=login-button]')
    await page.waitFor(1000)

    await page.goto('http://localhost:3000/myswaps')
    await page.waitFor(1000)

    await page.screenshot({ path: 'page.png' })

    await page.click('button[class=see-item-button]')
    await page.waitFor(1000)
  })
})
