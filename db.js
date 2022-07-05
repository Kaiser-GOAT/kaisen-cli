const path = require('path')
const home = process.env.HOME || process.env.homedir
const dbPath = path.join(home, '.todo')
const fs = require('fs')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(list), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  },
}

module.exports = db
