const fs = jest.createMockFromModule('fs')
const mocks = {}
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  if (callback === undefined) callback = options
  if (mocks[path]) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

module.exports = fs
