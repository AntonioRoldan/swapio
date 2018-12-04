const puppeteer = require('puppeteer')

const run = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000  /')
  await page.screenshot({ path: 'tests/screenshots/home.png' })

  await browser.close()
}

run()
