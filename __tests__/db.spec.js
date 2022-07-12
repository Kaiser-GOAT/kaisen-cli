const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  afterEach(() => {
    fs.clearMock()
  })
  it('can read', async () => {
    fs.setReadMock('/xxx', null, '[]')
    const list = await db.read('/xxx')
    expect(list).toStrictEqual([])
  })
  it('can write', async () => {
    let fakeFile
    const list = [{ title: '学习', done: true }]
    fs.setWriteMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list))
  })
})
