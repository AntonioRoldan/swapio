const swap = require('../modules/mocks/mocks-modules/swap')

const s = obj => JSON.stringify(obj, null, 2)

describe('Swapping algorithm', () => {
  test('Finding swaps', done => {
    swapOne = [{item: 'macbook air', tradefor: 'ps4'}] //Swap as it appears to user one 
    swapTwo = [{item: 'ps4', tradefor:'macbook air'}] //Swap as it appears to user two 
    expect(s(swap.makeSwap('bob@lmao.com')[0])).toBe(s(swapOne[0]))
    expect(s(swap.makeSwap('antonio@gmail.com')[0])).toBe(s(swapTwo[0]))
    done()
  })
})