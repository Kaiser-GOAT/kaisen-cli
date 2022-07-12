const fs = jest.createMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}
let writeMocks = {}
fs.setReadMock = (path, error, data) => {
  readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  if (!callback) callback = options
  if (path in readMocks) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

fs.setWriteMock = (path, fn) => {
  writeMocks[path] = fn
}
fs.writeFile = (path, data, option, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, option, callback)
  } else {
    _fs.writeFile(path, data, option, callback)
  }
}

fs.clearMock = () => {
  writeMocks = {}
  readMocks = {}
}

module.exports = fs
